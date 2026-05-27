import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket?.connected) return;

    this.socket = io('/', {
      path: '/ws/socket.io',
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('[LinkUp] Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('[LinkUp] Socket disconnected:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('[LinkUp] Connection error:', error.message);
    });

    // Re-attach all stored listeners
    this.listeners.forEach((callbacks, event) => {
      callbacks.forEach(cb => this.socket.on(event, cb));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event).filter(cb => cb !== callback);
      this.listeners.set(event, callbacks);
    }
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }

  // Convenience methods
  joinRoom(roomId) {
    this.emit('join_room', { room_id: roomId });
  }

  leaveRoom(roomId) {
    this.emit('leave_room', { room_id: roomId });
  }

  sendMessage(roomId, content) {
    this.emit('room_message', { room_id: roomId, content });
  }

  sendDirectMessage(userId, content) {
    this.emit('direct_message', { to_user: userId, content });
  }

  sendTyping(roomId) {
    this.emit('typing', { room_id: roomId });
  }

  sendStopTyping(roomId) {
    this.emit('stop_typing', { room_id: roomId });
  }
}

const socketService = new SocketService();
export default socketService;
