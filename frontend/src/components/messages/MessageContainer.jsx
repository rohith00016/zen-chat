import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useGetMessages from "../../hooks/useGetMessages";

const MessageContainer = () => {
  const { messages } = useGetMessages();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation?._id);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [currentFilteredIndex, setCurrentFilteredIndex] = useState(0);

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const filteredMessagesIndices = messages
    .map((message, index) => ({ message, index }))
    .filter(({ message }) =>
      message?.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleNextClick = () => {
    setCurrentFilteredIndex(
      (prevIndex) => (prevIndex + 1) % filteredMessagesIndices.length
    );
  };

  const handlePrevClick = () => {
    setCurrentFilteredIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredMessagesIndices.length) %
        filteredMessagesIndices.length
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchVisible(true);
  };

  const handleSearchCloseClick = () => {
    setSearchTerm("");
    setIsSearchVisible(false);
  };

  return (
    <div className="w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {" "}
          <div className="flex items-center bg-[#F6F6F9] p-2 border border-slate-300 px-3">
            {selectedConversation.profilePic ? (
              <div className={`avatar ${isOnline && "online"}`}>
                <div className="w-12 rounded-full">
                  <img
                    src={selectedConversation.profilePic}
                    alt="user avatar"
                  />
                </div>
              </div>
            ) : (
              <div className={`avatar placeholder ${isOnline && "online"}`}>
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span className="text-xl">
                    {selectedConversation.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <span className="text-gray-900 font-bold mx-2">
              {selectedConversation?.fullName}
            </span>
          </div>
          <div className="flex items-center p-2 space-x-2 fixed right-0 bg-[#F6F6F9]">
            <button
              onClick={handleSearchIconClick}
              className={`h-12 w-12 ${isSearchVisible && "hidden"}`}
            >
              <svg
                class="h-8 w-6 text-[#0dba4b]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <circle cx="11" cy="11" r="8" />{" "}
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {isSearchVisible && (
              <>
                <input
                  type="text"
                  placeholder="Search messages"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input input-bordered w-full"
                />
                {filteredMessagesIndices.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <button onClick={handlePrevClick} className="">
                      <svg
                        class="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button onClick={handleNextClick} className="">
                      <svg
                        class="h-8 w-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
                <button onClick={handleSearchCloseClick} className="mr-2">
                  <svg
                    class="h-10 w-10 text-stone-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {""}
                    <circle cx="12" cy="12" r="10" />{" "}
                    <line x1="15" y1="9" x2="9" y2="15" />{" "}
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <Messages
            searchTerm={searchTerm}
            currentFilteredIndex={currentFilteredIndex}
            filteredMessagesIndices={filteredMessagesIndices}
          />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="bg-[#F6F6F9] flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-2">
        <svg
          width="60"
          height="60"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-75"
        >
          <path
            d="M20.045 0C8.97544 0 0 8.95529 0 20C0 31.0447 8.97544 40 20.045 40C31.1145 40 40.09 31.0447 40.09 20C40.09 8.95529 31.1145 0 20.045 0Z"
            fill="#0DBA4B"
          />
          <path
            d="M26.6782 12.9699V19.6094C26.6782 19.6094 26.6782 20.1373 26.6782 20.4163C26.6782 21.4721 26.1564 22.4035 25.3516 22.9914C24.7989 23.3949 24.109 23.6352 23.3617 23.6352H20.0894C20.0761 23.6352 20.0584 23.6352 20.0452 23.6352C20.0319 23.6352 20.0186 23.6352 20.001 23.6352C18.1879 23.6567 16.7286 25.0902 16.7286 26.8584C16.7286 28.6395 18.2145 30.0816 20.0452 30.0816C21.8759 30.0816 23.3617 28.6395 23.3617 26.8584C23.3617 25.9657 24.1046 25.2447 25.02 25.2447C25.9221 25.2447 26.6561 25.9442 26.6782 26.8155C26.6782 26.8284 26.6782 26.8412 26.6782 26.8541V26.8627C26.6782 29.249 25.3428 31.3305 23.3617 32.4464C22.3844 32.9958 21.2524 33.3091 20.0452 33.3091C18.838 33.3091 17.7059 32.9958 16.7286 32.4464C14.7785 31.3477 13.4563 29.3177 13.4121 26.9829V26.734C13.4342 25.6052 13.757 24.5494 14.3009 23.6309C14.8847 22.6567 15.7204 21.8412 16.7286 21.2747C17.7059 20.7253 18.838 20.412 20.0452 20.412H22.6763C23.0566 20.412 23.3617 20.1159 23.3617 19.7468V13.2661C23.3617 13.2274 23.3617 13.1829 23.3617 13.1442C23.3617 13.1056 23.3635 13.0848 23.3617 13.0343C23.2998 11.3047 21.8405 9.9184 20.0496 9.9184H20.0452C18.2145 9.9184 16.7286 11.3648 16.7286 13.1459C16.7286 14.927 18.2145 16.3734 20.0452 16.3734H20.0496C20.8456 16.3734 21.5133 16.9142 21.6769 17.6352C21.7034 17.7468 21.7167 17.8669 21.7167 17.9871C21.7167 18.8455 21.0269 19.5451 20.1513 19.5966C20.1159 19.5966 20.0806 19.6009 20.0496 19.6009H20.0452C20.0319 19.6009 20.0186 19.6009 20.0054 19.6009C18.8114 19.5923 17.6971 19.279 16.7331 18.7382C14.752 17.6223 13.4165 15.5365 13.4165 13.1459C13.4121 10.7596 14.7476 8.67376 16.7286 7.55788C17.7059 7.00422 18.838 6.69092 20.0452 6.69092H20.0496C21.2568 6.69092 22.3889 7.00422 23.3617 7.55358C25.2941 8.63943 26.6119 10.6523 26.6782 12.9699Z"
            fill="white"
          />
        </svg>
        <p className="font-bold text-xl">ZenChat</p>
        <p className="text-sm opacity-25 w-3/4">
          Discover ZenChat: Your portal to peaceful communication. Streamline
          your conversations effortlessly in a tranquil environment. Connect,
          converse, and find serenity in every message.
        </p>
      </div>
    </div>
  );
};
