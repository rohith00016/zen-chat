import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  search: "",
  setSearch: (search) => set({ search }),
  filteredConversations: [],
  setFilteredConversations: (filteredConversations) =>
    set({ filteredConversations }), // Function to update filtered conversations state
}));

export default useConversation;
