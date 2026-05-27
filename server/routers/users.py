from fastapi import APIRouter, Depends, HTTPException, status
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from models.database import get_db
from models.schemas import User
# pyrefly: ignore [missing-import]
from auth.dependencies import get_current_user

router = APIRouter()

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    skills: Optional[str] = None  # Comma separated
    interests: Optional[str] = None  # Comma separated
    github: Optional[str] = None
    linkedin: Optional[str] = None

@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User profile not found"
        )
        
    return {
        "id": user.id,
        "name": user.name,
        "role": user.role,
        "bio": user.bio,
        "skills": [s.strip() for s in user.skills.split(",") if s.strip()] if user.skills else [],
        "interests": [i.strip() for i in user.interests.split(",") if i.strip()] if user.interests else [],
        "github": user.github,
        "linkedin": user.linkedin,
        "is_online": user.is_online
    }

@router.put("/profile")
def update_profile(data: ProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if data.name is not None:
        current_user.name = data.name
    if data.role is not None:
        current_user.role = data.role
    if data.bio is not None:
        current_user.bio = data.bio
    if data.skills is not None:
        current_user.skills = data.skills
    if data.interests is not None:
        current_user.interests = data.interests
    if data.github is not None:
        current_user.github = data.github
    if data.linkedin is not None:
        current_user.linkedin = data.linkedin
        
    db.commit()
    db.refresh(current_user)
    
    return {
        "status": "success",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "role": current_user.role,
            "bio": current_user.bio,
            "skills": [s.strip() for s in current_user.skills.split(",") if s.strip()] if current_user.skills else [],
            "interests": [i.strip() for i in current_user.interests.split(",") if i.strip()] if current_user.interests else []
        }
    }

@router.get("/users/search")
def search_users(q: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simple search skills/headline/name
    users = db.query(User).filter(
        (User.name.contains(q)) | 
        (User.role.contains(q)) | 
        (User.skills.contains(q))
    ).filter(User.id != current_user.id).all()
    
    return [
        {
            "id": u.id,
            "name": u.name,
            "role": u.role,
            "skills": [s.strip() for s in u.skills.split(",") if s.strip()] if u.skills else [],
            "is_online": u.is_online
        } for u in users
    ]
