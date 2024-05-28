import React, { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { search, setSearch, filteredConversations } = useConversation();

  const handleAlertClose = () => {
    setSearch("");
  };

  const displayedConversations = search !== "" && filteredConversations.length === 0
    ? []
    : filteredConversations.length > 0
      ? filteredConversations
      : conversations;

  return (
    <div className="bg-white flex flex-col overflow-auto">
      {search !== "" && filteredConversations?.length === 0 && (
        <div role="alert" className="alert shadow-lg">
          <svg
            className="h-6 w-6 text-[#0dba4b]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>

          <div>
            <h3 className="font-bold">No matches found</h3>
          </div>
          <button className="" onClick={handleAlertClose}>
            <svg
              className="h-8 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {displayedConversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default Conversations;
