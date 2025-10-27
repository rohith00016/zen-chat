import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const useConversation = create(
  subscribeWithSelector((set, get) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) =>
      set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => {
      set({ messages });
    },
    search: "",
    setSearch: (search) => set({ search }),
    filteredConversations: [],
    setFilteredConversations: (filteredConversations) =>
      set({ filteredConversations }),
  }))
);

export default useConversation;
