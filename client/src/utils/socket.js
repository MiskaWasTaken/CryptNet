import socketIO from 'socket.io-client';
import generateUrl from '@/api/generator';

let socket;

const proxyOptions = {
  host: 'socks5h://localhost',
  port: '9050',
  protocol: 'socks5:',
  socksVersion: 5,
}

export const connect = (roomId, proxyOptions) => {
  const socketUrl = generateUrl();

  const socketOptions = {
    query: {
      roomId,
    },
    forceNew: true,
    // Proxy configuration
    ...(proxyOptions && { agent: new Agent(proxyOptions) }),
  };

  socket = socketIO(socketUrl, socketOptions);
  return socket;
};

export const getSocket = () => socket;
