import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  // Memoize the online users handler to prevent recreation on every render
  const handleOnlineUsers = useCallback((users) => {
    setOnlineUsers(users);
  }, []);

  useEffect(() => {
    if (authUser) {
      const socketUrl =
        import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

      const socket = io(socketUrl, {
        auth: {
          token: authUser.token,
        },
      });

      setSocket(socket);

      // Connection event handlers
      socket.on("connect", () => {
        // Socket connected successfully
      });

      socket.on("disconnect", (reason) => {
        // Socket disconnected
      });

      socket.on("connect_error", (error) => {
        // Socket connection error - handled silently in production
      });

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", handleOnlineUsers);

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("getOnlineUsers", handleOnlineUsers);
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, handleOnlineUsers]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      socket,
      onlineUsers,
    }),
    [socket, onlineUsers]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
