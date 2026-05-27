# LinkUp AI ⚡ — Cyberpunk Event Networking Platform

> **AI-powered developer matchmaking** for hackathons and tech events. Find teammates and co-founders using TF-IDF cosine similarity matching, real-time WebSocket chat, and an immersive cyberpunk UI.

![LinkUp AI](https://img.shields.io/badge/LinkUp%20AI-Cyberpunk%20Platform-a855f7?style=for-the-badge&logo=lightning)
![FastAPI](https://img.shields.io/badge/FastAPI-0.136-06b6d4?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

---

## ✨ Features

- 🤖 **AI Matchmaking** — TF-IDF cosine similarity engine scores developer compatibility
- 💬 **Real-time Chat** — WebSocket-powered event rooms with typing indicators
- 🃏 **Swipe UI** — Tinder-style card swiping on the Discover page
- 🔐 **JWT Auth** — Secure signup/login with bcrypt password hashing
- 🗺️ **Event Map** — Interactive Leaflet.js map for hackathon locations
- 🎨 **Cyberpunk UI** — Glassmorphism, neon glows, Framer Motion animations

---

## 🛠 Tech Stack

| Layer     | Technologies |
|-----------|-------------|
| Frontend  | React 19 + Vite, Framer Motion, Tailwind CSS v4, Zustand |
| Backend   | FastAPI, SQLAlchemy, SQLite, WebSockets |
| AI Engine | TF-IDF + Cosine Similarity (scikit-learn style, pure Python) |
| Auth      | JWT (python-jose), bcrypt (passlib) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/linkup-ai.git
cd linkup-ai
```

### 2. Start the Backend
```bash
cd server
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install fastapi uvicorn sqlalchemy "python-jose[cryptography]" "passlib[bcrypt]" python-multipart websockets pydantic email-validator
uvicorn main:app --reload
# → http://127.0.0.1:8000
# → Swagger UI: http://127.0.0.1:8000/docs
```

### 3. Start the Frontend
```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

---

## 📁 Project Structure

```
linkup-ai/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # Landing, Signup, Login, Dashboard, Discover…
│   │   ├── components/      # Navbar, SwipeCard, etc.
│   │   ├── store/           # Zustand state management
│   │   ├── animations/      # Framer Motion variants
│   │   └── index.css        # Cyberpunk design system
│   └── vite.config.js
│
└── server/                  # FastAPI backend
    ├── main.py              # App entry point + WebSocket handler
    ├── routers/             # auth, users, connections, rooms
    ├── models/              # SQLAlchemy schemas + DB engine
    ├── auth/                # JWT + bcrypt security helpers
    ├── ai_engine/           # TF-IDF matchmaking logic
    └── websocket/           # ConnectionManager for real-time rooms
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/signup` | Register new user |
| POST | `/api/login` | Authenticate & get JWT |
| GET | `/api/recommendations` | Get AI-matched users |
| POST | `/api/connections/request/{id}` | Send connection request |
| GET | `/api/rooms` | List all event rooms |
| WS | `/ws?user_id={id}` | WebSocket for real-time chat |
| GET | `/api/health` | Health check |

---

## 📸 Screenshots

| Landing Page | Signup | Dashboard |
|---|---|---|
| Cyberpunk hero with animated orbs | Split-panel with skill tags | AI recommendations + match heatmap |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT © 2025 LinkUp AI
