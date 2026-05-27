from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models.database import get_db
from models.schemas import User, Connection
from auth.dependencies import get_current_user
from ai_engine.matcher import generate_recommendations

router = APIRouter()

@router.get("/recommendations")
def get_recommendations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch all other users
    all_users = db.query(User).filter(User.id != current_user.id).all()
    
    # Generate recommendations using our pure-Python cosine similarity algorithm
    recs = generate_recommendations(current_user, all_users)
    return recs

@router.post("/connect/{target_id}")
def connect_user(target_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    target = db.query(User).filter(User.id == target_id).first()
    if not target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Target user not found"
        )
        
    # Check if connection already exists
    existing = db.query(Connection).filter(
        Connection.user_id == current_user.id,
        Connection.target_id == target_id
    ).first()
    
    if existing:
        return {"status": "already_exists", "connection_status": existing.status}
        
    new_connection = Connection(
        user_id=current_user.id,
        target_id=target_id,
        status="pending"
    )
    db.add(new_connection)
    db.commit()
    
    return {"status": "success", "connection_status": "pending"}

@router.post("/connect/{target_id}/super")
def super_connect_user(target_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    target = db.query(User).filter(User.id == target_id).first()
    if not target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Target user not found"
        )
        
    new_connection = Connection(
        user_id=current_user.id,
        target_id=target_id,
        status="pending",
        is_super=True
    )
    db.add(new_connection)
    db.commit()
    return {"status": "success", "connection_status": "pending", "is_super": True}

@router.post("/skip/{target_id}")
def skip_user(target_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    new_connection = Connection(
        user_id=current_user.id,
        target_id=target_id,
        status="skipped"
    )
    db.add(new_connection)
    db.commit()
    return {"status": "skipped"}

@router.get("/connections")
def get_connections(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Find all accepted connections where current user is user_id or target_id
    conns = db.query(Connection).filter(
        ((Connection.user_id == current_user.id) | (Connection.target_id == current_user.id)),
        Connection.status == "accepted"
    ).all()
    
    connected_users = []
    for c in conns:
        other_id = c.target_id if c.user_id == current_user.id else c.user_id
        other_user = db.query(User).filter(User.id == other_id).first()
        if other_user:
            connected_users.append({
                "id": other_user.id,
                "name": other_user.name,
                "role": other_user.role,
                "bio": other_user.bio,
                "skills": [s.strip() for s in other_user.skills.split(",") if s.strip()] if other_user.skills else [],
                "is_online": other_user.is_online
            })
            
    return connected_users

@router.get("/connections/pending")
def get_pending_requests(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Find pending connections sent to current_user
    reqs = db.query(Connection).filter(
        Connection.target_id == current_user.id,
        Connection.status == "pending"
    ).all()
    
    pending_users = []
    for r in reqs:
        sender = db.query(User).filter(User.id == r.user_id).first()
        if sender:
            pending_users.append({
                "connection_id": r.id,
                "id": sender.id,
                "name": sender.name,
                "role": sender.role,
                "skills": [s.strip() for s in sender.skills.split(",") if s.strip()] if sender.skills else []
            })
            
    return pending_users

@router.post("/connections/{connection_id}/accept")
def accept_connection(connection_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conn = db.query(Connection).filter(
        Connection.id == connection_id,
        Connection.target_id == current_user.id
    ).first()
    
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Connection request not found"
        )
        
    conn.status = "accepted"
    db.commit()
    return {"status": "accepted"}

@router.post("/connections/{connection_id}/decline")
def decline_connection(connection_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conn = db.query(Connection).filter(
        Connection.id == connection_id,
        Connection.target_id == current_user.id
    ).first()
    
    if not conn:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Connection request not found"
        )
        
    conn.status = "declined"
    db.commit()
    return {"status": "declined"}
