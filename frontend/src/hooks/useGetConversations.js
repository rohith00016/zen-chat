import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../utils/api";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);

  // Memoize the getConversations function to prevent recreation on every render
  const getConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/users");
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return {
    loading,
    conversations,
    filteredConversations,
    setFilteredConversations,
  };
};
export default useGetConversations;
