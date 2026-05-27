from fastapi import APIRouter, Depends, HTTPException, status
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from models.database import get_db
from models.schemas import Room
# pyrefly: ignore [missing-import]
from auth.dependencies import get_current_user
from pydantic import BaseModel

router = APIRouter()

class JoinRoomRequest(BaseModel):
    room_id: int

@router.get("/rooms")
def get_rooms(db: Session = Depends(get_db)):
    rooms = db.query(Room).all()
    
    # Initialize some default rooms if db is empty
    if not rooms:
        default_rooms = [
            Room(name="AI Hackathon", description="General discussion for AI Hackathon 2026 participants", icon="🤖", members_count=142, is_live=True, category="hackathon"),
            Room(name="Web3 Builders", description="Connect with blockchain developers and Web3 enthusiasts", icon="⛓️", members_count=89, is_live=True, category="tech"),
            Room(name="Startup Networking", description="Find co-founders, mentors, and investors", icon="🚀", members_count=203, is_live=True, category="networking"),
            Room(name="Team Formation", description="Looking for teammates? Post your skills and find your team", icon="👥", members_count=167, is_live=True, category="hackathon"),
            Room(name="Frontend Developers", description="React, Vue, Svelte - discuss the latest in frontend tech", icon="🎨", members_count=94, is_live=False, category="tech")
        ]
        for r in default_rooms:
            db.add(r)
        db.commit()
        rooms = db.query(Room).all()
        
    return [
        {
            "id": r.id,
            "name": r.name,
            "description": r.description,
            "icon": r.icon,
            "members": r.members_count,
            "isLive": r.is_live,
            "category": r.category
        } for r in rooms
    ]

@router.post("/rooms/join")
def join_room(data: JoinRoomRequest, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    room = db.query(Room).filter(Room.id == data.room_id).first()
    if not room:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found"
        )
        
    # Increment room members count for simulated display
    room.members_count += 1
    db.commit()
    
    return {"status": "success", "room_id": room.id}
