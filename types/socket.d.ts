import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

declare module 'net' {
    interface Socket {
        server: HTTPServer & { io?: SocketIOServer };
    }
}
