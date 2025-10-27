import { useEffect, useCallback } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  const handleNewMessage = useCallback(
    (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();

      // Get current messages from the store
      const currentMessages = useConversation.getState().messages;

      // Check if message already exists to prevent duplicates
      const messageExists = currentMessages.some(
        (msg) => msg._id === newMessage._id
      );
      if (messageExists) {
        return;
      }

      const newMessages = [...currentMessages, newMessage];
      setMessages(newMessages);
    },
    [setMessages]
  );

  const handleDeleteMessage = useCallback(
    (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    },
    [setMessages]
  );

  const handleUpdateMessage = useCallback(
    (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    },
    [setMessages]
  );

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("newMessage", (message) => {
      handleNewMessage(message);
    });

    socket.on("deleteMessage", (messageId) => {
      handleDeleteMessage(messageId);
    });

    socket.on("updateMessage", (message) => {
      handleUpdateMessage(message);
    });

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("deleteMessage", handleDeleteMessage);
      socket.off("updateMessage", handleUpdateMessage);
    };
  }, [socket, handleNewMessage, handleDeleteMessage, handleUpdateMessage]);

  return null;
};

export default useListenMessages;
