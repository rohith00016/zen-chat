import { memo, useCallback, useMemo } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import Conversation from "./Conversation";

const Conversations = memo(({ onConversationSelect }) => {
  const { loading, conversations } = useGetConversations();
  const { search, setSearch, filteredConversations } = useConversation();

  const handleAlertClose = useCallback(() => {
    setSearch("");
  }, [setSearch]);

  // Memoize the displayed conversations to prevent recalculation on every render
  const displayedConversations = useMemo(() => {
    if (search !== "" && filteredConversations.length === 0) {
      return [];
    }
    return filteredConversations.length > 0
      ? filteredConversations
      : conversations;
  }, [search, filteredConversations, conversations]);

  return (
    <div className="flex flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-b from-transparent to-slate-50/30">
      {search !== "" && filteredConversations?.length === 0 && (
        <div
          role="alert"
          className="mx-4 my-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-red-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="h-5 w-5 text-red-500"
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
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">No matches found</h3>
              <p className="text-sm text-slate-500">
                Try a different search term
              </p>
            </div>
            <button
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
              onClick={handleAlertClose}
            >
              <svg
                className="h-4 w-4 text-red-500"
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
        </div>
      )}

      <div className="py-2 ">
        {displayedConversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            onSelect={onConversationSelect}
          />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-[#0DBA4B] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

Conversations.displayName = "Conversations";

export default Conversations;
