import { memo, useCallback } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import OptimizedImage from "../OptimizedImage";

const Conversation = memo(({ conversation, onSelect }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  // Memoize the click handler to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    setSelectedConversation(conversation);
    // Close sidebar on mobile when conversation is selected
    if (onSelect) {
      onSelect();
    }
  }, [conversation, setSelectedConversation, onSelect]);

  return (
    <div
      className={`group flex items-center gap-3 h-20 p-4 cursor-pointer transition-all duration-200 ease-out surface-primary hover:bg-neutral-50 border-b border-neutral-100 ${
        isSelected ? "bg-primary-50 border-primary-200" : ""
      }`}
      onClick={handleClick}
    >
      {/* Avatar with online indicator */}
      <div className="relative">
        {conversation.profilePic ? (
          <div className={`avatar ${isOnline && "online"}`}>
            <div className="w-12 h-12 rounded-full shadow-md">
              <OptimizedImage
                src={conversation.profilePic}
                alt="user avatar"
                className="w-12 h-12 rounded-full object-cover"
                key={conversation._id}
              />
            </div>
          </div>
        ) : (
          <div className={`avatar placeholder ${isOnline && "online"}`}>
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
              <span className="text-lg font-semibold">
                {conversation.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Online indicator */}
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 border-2 border-white rounded-full shadow-sm"></div>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p
            className={`font-semibold text-sm truncate ${
              isSelected ? "text-primary-700" : "text-neutral-800"
            }`}
          >
            {conversation.fullName}
          </p>
          {isOnline && (
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <p className="text-xs mt-1 text-neutral-500">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
});

Conversation.displayName = "Conversation";

export default Conversation;
