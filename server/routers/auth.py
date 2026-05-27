from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from models.database import get_db
from models.schemas import User
from auth.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = ""
    skills: str = ""
    interests: str = ""

class UserLogin(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
def signup(data: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    user_exists = db.query(User).filter(User.email == data.email).first()
    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email address already registered"
        )
        
    hashed = get_password_hash(data.password)
    new_user = User(
        name=data.name,
        email=data.email,
        hashed_password=hashed,
        role=data.role,
        skills=data.skills,
        interests=data.interests
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token({"sub": str(new_user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role,
            "skills": [s.strip() for s in new_user.skills.split(",") if s.strip()],
            "interests": [i.strip() for i in new_user.interests.split(",") if i.strip()]
        }
    }

@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email credentials or password"
        )
        
    token = create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "skills": [s.strip() for s in user.skills.split(",") if s.strip()] if user.skills else [],
            "interests": [i.strip() for i in user.interests.split(",") if i.strip()] if user.interests else []
        }
    }
