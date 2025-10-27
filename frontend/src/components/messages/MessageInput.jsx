import { useState, memo, useCallback } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = memo(() => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!message && !file) return;

      const formData = new FormData();
      formData.append("message", message);
      if (file) formData.append("file", file);

      await sendMessage(formData);
      setMessage("");
      setFile(null);
    },
    [message, file, sendMessage]
  );

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      {/* File display area */}
      {file && (
        <div className="mb-4 p-4 bg-primary-50 border border-primary-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800">
                  {file.name}
                </p>
                <p className="text-xs text-neutral-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="p-2 text-neutral-400 hover:text-error-500 hover:bg-error-50 rounded-lg transition-all duration-200"
              title="Remove file"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

      <div className="flex items-center gap-3">
        <label
          htmlFor="fileUpload"
          className="flex items-center hover:cursor-pointer flex-shrink-0 p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
        >
          <input
            id="fileUpload"
            type="file"
            className="sr-only"
            accept="image/*,audio/*,video/*"
            onChange={handleFileChange}
          />
          <svg
            className="h-6 w-6 text-primary-500 hover:text-primary-600 transition-colors"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 16 12 12 8 16" />
            <line x1="12" y1="12" x2="12" y2="21" />
            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
            <polyline points="16 16 12 12 8 16" />
          </svg>
        </label>
        <div className="w-full relative">
          <input
            type="text"
            className={`h-12 border text-sm rounded-xl block w-full px-4 pr-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              file
                ? "border-primary-300 bg-primary-50 text-neutral-600"
                : "border-neutral-300 bg-white hover:border-neutral-400"
            }`}
            placeholder="Send a message"
            value={message}
            onChange={handleMessageChange}
            disabled={file !== null}
          />
          <button
            type="submit"
            className="absolute inset-y-0 end-0 flex items-center pe-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg
                className="h-5 w-5 text-primary-500 hover:text-primary-600 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
});

MessageInput.displayName = "MessageInput";

export default MessageInput;
