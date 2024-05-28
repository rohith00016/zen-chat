import { useEffect, useRef, useCallback } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = ({
  searchTerm,
  currentFilteredIndex,
  filteredMessagesIndices,
}) => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const containerRef = useRef();

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (!loading || messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, loading]);

  return (
    <div
      className="p-4 flex-1 overflow-auto relative bg-[#F6F6F9]"
      ref={containerRef}
    >
      <div className="fixed top-2 flex justify-between px-4 z-10"></div>

      {!loading &&
        messages.map((message, idx) => (
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
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
