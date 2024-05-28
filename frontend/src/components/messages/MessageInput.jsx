import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("file", file);

    await sendMessage(formData);
    setMessage("");
    setFile(null);
  };

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="flex items-center">
        <label
          htmlFor="fileUpload"
          className="mx-2 flex items-center pl-3 :hover cursor-pointer"
        >
          <input
            id="fileUpload"
            type="file"
            className="sr-only"
            accept="image/*,audio/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <svg
            className="h-8 w-8 text-green-500 "
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <polyline points="16 16 12 12 8 16" />{" "}
            <line x1="12" y1="12" x2="12" y2="21" />{" "}
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />{" "}
            <polyline points="16 16 12 12 8 16" />
          </svg>{" "}
        </label>
        <div className="w-full relative mr-8">
          <input
            type="text"
            className="h-12 mx-1 border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-white pl-10"
            placeholder={file ? file.name : "Send a message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={file !== null}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <svg
                className="h-6 w-6 text-[#0DBA4B]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <line x1="22" y1="2" x2="11" y2="13" />{" "}
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default MessageInput;
