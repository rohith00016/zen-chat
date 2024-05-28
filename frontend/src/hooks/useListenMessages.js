import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });

    socket?.on("deleteMessage", (messageId) => {
      setMessages(messages.filter((msg) => msg._id !== messageId));
    });

    socket?.on("updateMessage", (updatedMessage) => {
      setMessages(
        messages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("deleteMessage");
      socket?.off("updateMessage");
    };
  }, [socket, setMessages, messages]);

  return null;
};

export default useListenMessages;
