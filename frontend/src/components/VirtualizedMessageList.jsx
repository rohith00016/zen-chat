import { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import Message from './messages/Message';
import MessageSkeleton from './skeletons/MessageSkeleton';

/**
 * Virtualized message list component
 * Renders only visible messages for better performance with large lists
 * Uses intersection observer for efficient rendering
 */
const VirtualizedMessageList = memo(({ 
  messages, 
  loading, 
  searchTerm, 
  currentFilteredIndex, 
  filteredMessagesIndices 
}) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const containerRef = useRef(null);
  const itemHeight = 80; // Approximate height of each message
  const containerHeight = 600; // Approximate container height
  const buffer = 5; // Extra items to render outside visible area

  // Calculate visible range based on scroll position
  const updateVisibleRange = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(
      messages.length, 
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer
    );
    
    setVisibleRange({ start, end });
  }, [messages.length, itemHeight, containerHeight, buffer]);

  // Throttle scroll events for better performance
  const throttledUpdateRange = useCallback(() => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisibleRange, 16); // ~60fps
    };
  }, [updateVisibleRange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const throttledHandler = throttledUpdateRange();
    container.addEventListener('scroll', throttledHandler);
    
    return () => {
      container.removeEventListener('scroll', throttledHandler);
    };
  }, [throttledUpdateRange]);

  // Memoize visible messages to prevent unnecessary re-renders
  const visibleMessages = useMemo(() => {
    if (loading) {
      return [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />);
    }

    return messages
      .slice(visibleRange.start, visibleRange.end)
      .map((message, idx) => {
        const actualIndex = visibleRange.start + idx;
        return (
          <div
            key={message._id}
            id={`message-${actualIndex}`}
            className={
              filteredMessagesIndices[currentFilteredIndex]?.index === actualIndex &&
              searchTerm.length > 0
                ? "bg-yellow-100 transition duration-300"
                : ""
            }
            style={{ height: itemHeight }}
          >
            <Message message={message} />
          </div>
        );
      });
  }, [loading, messages, visibleRange, filteredMessagesIndices, currentFilteredIndex, searchTerm, itemHeight]);

  // Calculate total height for proper scrolling
  const totalHeight = messages.length * itemHeight;

  return (
    <div
      ref={containerRef}
      className="p-4 flex-1 overflow-auto relative bg-[#F6F6F9]"
      style={{ height: containerHeight }}
    >
      <div 
        style={{ height: totalHeight, position: 'relative' }}
      >
        <div 
          style={{ 
            transform: `translateY(${visibleRange.start * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleMessages}
        </div>
      </div>
      
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
});

VirtualizedMessageList.displayName = 'VirtualizedMessageList';

export default VirtualizedMessageList;

