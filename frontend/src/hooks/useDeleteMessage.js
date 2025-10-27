import api from "../utils/api";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useDeleteMessage = () => {
  const { messages, setMessages } = useConversation();

  const deleteMessage = async (messageId) => {
    try {
      setMessages(messages.filter((msg) => msg._id !== messageId));
      await api.delete(`/messages/delete/${messageId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { deleteMessage };
};

export default useDeleteMessage;
