import { useEffect, useState, useRef } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../utils/api";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const lastConversationId = useRef(null);
  const isInitialized = useRef(false);
  const isSendingMessage = useRef(false);

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) {
        isInitialized.current = false;
        return;
      }

      // Only fetch if conversation actually changed
      if (
        lastConversationId.current === selectedConversation._id &&
        isInitialized.current
      ) {
        return;
      }

      // Don't fetch if we have messages and conversation hasn't changed
      if (
        lastConversationId.current === selectedConversation._id &&
        messages.length > 0
      ) {
        return;
      }

      lastConversationId.current = selectedConversation._id;
      isInitialized.current = true;
      setLoading(true);

      try {
        const res = await fetchWithAuth(
          `/messages/${selectedConversation._id}`
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(error.message);
        setMessages([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id]);

  return { messages, loading };
};
export default useGetMessages;
