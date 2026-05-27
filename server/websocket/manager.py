from fastapi import WebSocket
from typing import Dict, List, Set
import json

class ConnectionManager:
    def __init__(self):
        # Maps user_id to active WebSocket connection
        self.active_connections: Dict[int, WebSocket] = {}
        # Maps room_id to set of user_ids active in that room
        self.room_members: Dict[int, Set[int]] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            
        # Clean up user from rooms
        for room_id, members in self.room_members.items():
            if user_id in members:
                members.remove(user_id)

    async def send_personal_message(self, message: str, user_id: int):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)

    async def broadcast_to_room(self, room_id: int, message: dict):
        if room_id in self.room_members:
            payload = json.dumps(message)
            for user_id in self.room_members[room_id]:
                if user_id in self.active_connections:
                    await self.active_connections[user_id].send_text(payload)

    def join_room(self, room_id: int, user_id: int):
        if room_id not in self.room_members:
            self.room_members[room_id] = set()
        self.room_members[room_id].add(user_id)

    def leave_room(self, room_id: int, user_id: int):
        if room_id in self.room_members and user_id in self.room_members[room_id]:
            self.room_members[room_id].remove(user_id)

manager = ConnectionManager()
