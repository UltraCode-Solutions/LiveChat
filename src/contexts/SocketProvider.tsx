"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import * as io from 'socket.io-client';

interface SocketContextType {
  socket: io.Socket | undefined;
  isSocketActive: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: undefined,
  isSocketActive: false,
});

const SocketProvider = ({ children }: React.PropsWithChildren) => {
  const [isSocketActive, setIsSocketActive] = useState<boolean>(false);
  const socket = io.connect(process.env.NEXT_PUBLIC_BASE_BACKEND as string);

  useEffect(() => {
    const handleSocketStatusChange = (isActive: boolean) => {
      setIsSocketActive(isActive);
    };

    socket.on('connect', () => handleSocketStatusChange(true));
    socket.on('disconnect', () => handleSocketStatusChange(false));

    return () => {
      socket.off('connect', () => handleSocketStatusChange(true));
      socket.off('disconnect', () => handleSocketStatusChange(false));
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isSocketActive }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = (): io.Socket => {
  return useContext(SocketContext).socket!;
};

export { SocketContext, SocketProvider, useSocket };
