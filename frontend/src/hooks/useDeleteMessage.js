import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useDeleteMessage = () => {
  const { messages, setMessages } = useConversation();

  const deleteMessage = async (messageId) => {
    try {
      setMessages(messages.filter((msg) => msg._id !== messageId));
      await axios.delete(`/api/messages/delete/${messageId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { deleteMessage };
};

export default useDeleteMessage;
