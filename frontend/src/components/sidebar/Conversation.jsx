import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <div
        className={`flex gap-2 rounded-lg mx-3 p-2 cursor-pointer
				${isSelected ? "bg-stone-300" : "hover:bg-stone-200"}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        {conversation.profilePic ? (
          <div className={`avatar ${isOnline && "online"}`}>
            <div className={`w-12 rounded-full`}>
              <img src={conversation.profilePic} alt="user avatar" />
            </div>
          </div>
        ) : (
          <div className="avatar online placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-16">
              <span className="text-xl">
                {fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 m-0">
          <div className="flex justify-between">
            <p className="mx-1 font-bold">{conversation.fullName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Conversation;
