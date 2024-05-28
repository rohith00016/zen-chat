import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useUpdateMessage = () => {
  const { messages, setMessages } = useConversation();

  const updateMessage = async (messageId, newContent) => {
    try {
      const response = await axios.put(`/api/messages/update/${messageId}`, {
        message: newContent,
      });
      setMessages(
        messages.map((msg) =>
          msg._id === response.data._id ? response.data : msg
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { updateMessage };
};

export default useUpdateMessage;
