import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session

from models.database import engine, Base, get_db
from models.schemas import User, Message, Room
from routers import auth, users, connections, rooms
from websocket.manager import manager

# Create SQLite Database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LinkUp AI Backend Services",
    description="Futuristic AI-powered developer matching engine APIs",
    version="1.0.0"
)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(users.router, prefix="/api", tags=["Users"])
app.include_router(connections.router, prefix="/api", tags=["Connections"])
app.include_router(rooms.router, prefix="/api", tags=["Rooms"])

@app.get("/api/health")
def health_check():
    return {"status": "operational", "ai_engine": "online", "database": "sqlite"}

# FastAPI Websocket routing
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, user_id: int, db: Session = Depends(get_db)):
    await manager.connect(user_id, websocket)
    
    # Toggle user online status in database
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.is_online = True
        db.commit()
        
    try:
        while True:
            # Receive broadcast data
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            action = payload.get("action")
            
            if action == "join_room":
                room_id = payload.get("room_id")
                manager.join_room(room_id, user_id)
                await manager.broadcast_to_room(room_id, {
                    "event": "user_joined",
                    "user_id": user_id,
                    "name": user.name if user else "Developer"
                })
                
            elif action == "leave_room":
                room_id = payload.get("room_id")
                manager.leave_room(room_id, user_id)
                await manager.broadcast_to_room(room_id, {
                    "event": "user_left",
                    "user_id": user_id
                })
                
            elif action == "room_message":
                room_id = payload.get("room_id")
                content = payload.get("content")
                
                # Save to database
                db_msg = Message(
                    sender_id=user_id,
                    room_id=room_id,
                    content=content
                )
                db.add(db_msg)
                db.commit()
                
                await manager.broadcast_to_room(room_id, {
                    "event": "new_message",
                    "sender_id": user_id,
                    "sender_name": user.name if user else "Anonymous",
                    "content": content,
                    "timestamp": str(db_msg.timestamp)
                })
                
            elif action == "typing":
                room_id = payload.get("room_id")
                await manager.broadcast_to_room(room_id, {
                    "event": "typing",
                    "user_id": user_id,
                    "name": user.name if user else "Developer"
                })
                
            elif action == "stop_typing":
                room_id = payload.get("room_id")
                await manager.broadcast_to_room(room_id, {
                    "event": "stop_typing",
                    "user_id": user_id
                })
                
    except WebSocketDisconnect:
        manager.disconnect(user_id)
        if user:
            user.is_online = False
            db.commit()
