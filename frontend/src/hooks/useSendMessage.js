import { useState, useCallback } from "react";
import useConversation from "../zustand/useConversation";
import api from "../utils/api";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation();

  const sendMessage = useCallback(
    async (formData) => {
      if (!selectedConversation?._id) return;

      setLoading(true);
      try {
        const response = await api.post(
          `/messages/send/${selectedConversation._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Get current messages from the store
        const currentMessages = useConversation.getState().messages;
        const newMessages = [...currentMessages, response.data];
        setMessages(newMessages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedConversation?._id, setMessages]
  );

  return { sendMessage, loading };
};

export default useSendMessage;
