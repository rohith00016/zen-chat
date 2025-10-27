import { useEffect, useRef, memo, useCallback, useMemo } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import VirtualizedMessageList from "../VirtualizedMessageList";
import useListenMessages from "../../hooks/useListenMessages";
import { getPerformanceSettings } from "../../utils/performance";

const Messages = memo(
  ({ searchTerm, currentFilteredIndex, filteredMessagesIndices }) => {
    const { messages, loading } = useGetMessages();
    useListenMessages();
    const containerRef = useRef();

    // Memoize the scroll function to prevent recreation on every render
    const scrollToBottom = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, []);

    useEffect(() => {
      if (!loading || (Array.isArray(messages) && messages.length > 0)) {
        scrollToBottom();
      }
    }, [messages, loading, scrollToBottom]);

    // Get performance settings to determine if virtualization should be used
    const performanceSettings = useMemo(() => getPerformanceSettings(), []);
    const shouldUseVirtualization =
      performanceSettings.enableVirtualization &&
      Array.isArray(messages) &&
      messages.length > 50;

    // Memoize the message list to prevent unnecessary re-renders
    const messageList = useMemo(() => {
      if (loading) {
        return [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />);
      }

      // Ensure messages is always an array
      const safeMessages = Array.isArray(messages) ? messages : [];

      return safeMessages.map((message, idx) => (
        <div
          key={message._id}
          id={`message-${idx}`}
          className={
            filteredMessagesIndices[currentFilteredIndex]?.index === idx &&
            searchTerm.length > 0
              ? "bg-yellow-100 transition duration-300"
              : ""
          }
        >
          <Message message={message} />
        </div>
      ));
    }, [
      loading,
      messages,
      filteredMessagesIndices,
      currentFilteredIndex,
      searchTerm,
    ]);

    return (
      <div
        className="h-full overflow-auto relative surface-tertiary"
        ref={containerRef}
      >
        <div className="fixed top-2 flex justify-between px-4 z-10"></div>

        {shouldUseVirtualization ? (
          <VirtualizedMessageList
            messages={messages}
            loading={loading}
            searchTerm={searchTerm}
            currentFilteredIndex={currentFilteredIndex}
            filteredMessagesIndices={filteredMessagesIndices}
          />
        ) : (
          <div className="p-4">{messageList}</div>
        )}

        {!loading && Array.isArray(messages) && messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-neutral-500 text-lg font-medium">
              Send a message to start the conversation
            </p>
          </div>
        )}
      </div>
    );
  }
);

Messages.displayName = "Messages";

export default Messages;
