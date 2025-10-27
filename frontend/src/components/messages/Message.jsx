import { useState, useRef, memo, useCallback, useMemo } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import useUpdateMessage from "../../hooks/useUpdateMessage";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import OptimizedImage from "../OptimizedImage";

const Message = memo(({ message }) => {
  const { authUser } = useAuthContext();
  const { deleteMessage } = useDeleteMessage();
  const { updateMessage } = useUpdateMessage();

  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(message.message);
  const [showDropdown, setShowDropdown] = useState(false);

  const messageRef = useRef(null);

  // Memoize computed values to prevent recalculation on every render
  const fromMe = useMemo(
    () => message.senderId === authUser._id,
    [message.senderId, authUser._id]
  );
  const formattedTime = useMemo(
    () => extractTime(message.createdAt),
    [message.createdAt]
  );
  const chatClassName = useMemo(
    () => (fromMe ? "chat-end" : "chat-start"),
    [fromMe]
  );
  const bubbleBgColor = useMemo(
    () => (fromMe ? "bg-primary-500" : "bg-neutral-800"),
    [fromMe]
  );
  const shakeClass = useMemo(
    () => (message.shouldShake ? "shake" : ""),
    [message.shouldShake]
  );

  // Memoize event handlers to prevent unnecessary re-renders
  const handleDelete = useCallback(async () => {
    await deleteMessage(message._id);
  }, [deleteMessage, message._id]);

  const handleEdit = useCallback(async () => {
    if (isEditing) {
      await updateMessage(message._id, newContent);
    }
    setIsEditing(!isEditing);
  }, [isEditing, updateMessage, message._id, newContent]);

  const handleContentChange = useCallback((e) => {
    setNewContent(e.target.value);
  }, []);

  // Memoize the file render function to prevent recreation on every render
  const renderFile = useCallback(() => {
    if (message.fileUrl) {
      const fileExtension = message.fileUrl.split(".").pop().toLowerCase();
      if (fileExtension === "mp3" || fileExtension === "wav") {
        return <audio controls src={message.fileUrl} />;
      } else if (
        fileExtension === "mp4" ||
        fileExtension === "avi" ||
        fileExtension === "mkv"
      ) {
        return (
          <video
            controls
            src={message.fileUrl}
            className="max-w-[280px] sm:max-w-[300px] rounded-lg"
          />
        );
      } else {
        return (
          <OptimizedImage
            src={message.fileUrl}
            alt="File"
            className="max-w-[280px] sm:max-w-[300px] rounded-lg"
          />
        );
      }
    }
    return null;
  }, [message.fileUrl]);

  return (
    <div
      ref={messageRef}
      className={`chat ${chatClassName} group relative mb-4`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {renderFile() ? (
        renderFile()
      ) : (
        <div
          className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} px-4 py-3 rounded-2xl max-w-[280px] sm:max-w-xs lg:max-w-md shadow-sm hover:shadow-md transition-shadow duration-200`}
        >
          {isEditing ? (
            <input
              type="text"
              value={newContent}
              onChange={handleContentChange}
              onBlur={handleEdit}
              className="w-full bg-transparent outline-none text-white placeholder-white/70"
              placeholder="Type your message..."
            />
          ) : (
            <span className="break-words">
              {typeof message.message === "string" && message.message
                ? message.message
                : ""}
            </span>
          )}
        </div>
      )}

      {/* Message footer with timestamp and action buttons */}
      <div className="chat-footer text-xs flex items-center justify-between mt-2">
        <span className="text-neutral-500 font-medium">{formattedTime}</span>

        {/* Action buttons for own messages */}
        {fromMe && showDropdown && (
          <div className="flex items-center gap-1">
            {!message.fileUrl && (
              <button
                onClick={() => {
                  handleEdit();
                  setShowDropdown(false);
                }}
                className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-200 hover:scale-105"
                title={isEditing ? "Save changes" : "Edit message"}
              >
                <FiEdit className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => {
                handleDelete();
                setShowDropdown(false);
              }}
              className="p-1.5 text-error-500 hover:bg-error-50 rounded-lg transition-all duration-200 hover:scale-105"
              title="Delete message"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

Message.displayName = "Message";

export default Message;
