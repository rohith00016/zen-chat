import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="bg-[#F6F6F9] border-r border-gray-300 flex flex-col justify-between">
      <div>
        <SearchInput />
        <div className="divider m-0 p-0"></div>

        <Conversations />
      </div>
      <div className="flex justify-between items-center">
        <Profile />
        <LogoutButton />
      </div>
    </div>
  );
};
export default Sidebar;
