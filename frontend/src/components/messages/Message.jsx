import { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useDeleteMessage from "../../hooks/useDeleteMessage";
import useUpdateMessage from "../../hooks/useUpdateMessage";
import { FiEdit, FiTrash2, FiSave } from "react-icons/fi"; 

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { deleteMessage } = useDeleteMessage();
    const { updateMessage } = useUpdateMessage();

    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(message.message);
    const [showActions, setShowActions] = useState(false);

    const messageRef = useRef(null);

    const handleClickOutside = (event) => {
        if (messageRef.current && !messageRef.current.contains(event.target)) {
            setShowActions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-[#0DBA4B]" : "bg-[#212529]";
    const shakeClass = message.shouldShake ? "shake" : "";

    const handleDelete = async () => {
        await deleteMessage(message._id);
    };

    const handleEdit = async () => {
        if (isEditing) {
            await updateMessage(message._id, newContent);
        }
        setIsEditing(!isEditing);
    };

    const renderFile = () => {
        if (message.fileUrl) {
            const fileExtension = message.fileUrl.split('.').pop().toLowerCase();
            if (fileExtension === 'mp3' || fileExtension === 'wav') {
                return <audio controls src={message.fileUrl} />;
            } else if (fileExtension === 'mp4' || fileExtension === 'avi' || fileExtension === 'mkv') {
                return <video controls src={message.fileUrl} style={{ maxWidth: '300px' }} />;
            } else {
                return <img src={message.fileUrl}  style={{ maxWidth: '300px' }} alt="File" />;
            }
        }
        return null;
    };

    return (
        <div ref={messageRef} className={`chat ${chatClassName}`} onClick={() => setShowActions(true)}>
            {renderFile() ? (
                renderFile()
            ) : (
                <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            onBlur={handleEdit}
                            className="form-control bg-[#0DBA4B] outline-none"
                        />
                    ) : (
                        <span>{message.message}</span>
                    )}
                </div>
            )}
            {showActions && (
                <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                    {formattedTime}
                    {fromMe && !message.fileUrl && (
                        <>
                            <button onClick={handleEdit} className="text-stone-900 hover:text-stone-500 flex items-center">
                                {isEditing ? <FiSave /> : <FiEdit />}
                            </button>
                            <button onClick={handleDelete} className="text-red-700 hover:text-red-500 flex items-center">
                                <FiTrash2 />
                            </button>
                        </>
                    )}
                    {fromMe && message.fileUrl && (
                        <button onClick={handleDelete} className="text-red-900 hover:text-red-500 flex items-center">
                            <FiTrash2 />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Message;
