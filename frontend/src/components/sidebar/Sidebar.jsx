import { memo } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import SearchInput from "./SearchInput";

const Sidebar = memo(({ onClose }) => {
  return (
    <div className="surface-secondary border-r border-neutral-200/60 backdrop-blur-sm flex flex-col justify-between h-full shadow-xl w-full">
      {/* Header Section */}
      <div className="p-4 border-b border-neutral-200/50">
        <SearchInput />
      </div>

      {/* Conversations Section */}
      <div className="flex-1 overflow-hidden">
        <Conversations onConversationSelect={onClose} />
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-neutral-200/50 surface-primary/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Profile />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
