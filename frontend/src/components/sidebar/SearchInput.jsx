import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const {
    search,
    setSearch,
    setSelectedConversation,
    filteredConversations,
    setFilteredConversations,
  } = useConversation();
  const { conversations } = useGetConversations();
  const [searchBox, setSearchBox] = useState(false);

  const filterConversations = (value) => {
    setSearch(value);
    if (!value) {
      setFilteredConversations([]);
    } else {
      const filtered = conversations.filter((conversation) =>
        conversation.fullName.toLowerCase().includes(value.toLowerCase())
      );

      // Sort the filtered array by the starting value
      filtered.sort((a, b) => {
        const nameA = a.fullName.toLowerCase();
        const nameB = b.fullName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      setFilteredConversations(filtered);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    if (filteredConversations.length > 0) {
      const conversation = filteredConversations[0];
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  const toggleSearchBox = () => {
    setSearchBox(!searchBox);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
      {searchBox ? (
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full transition-all duration-300 ease-in-out"
          value={search}
          onChange={(e) => filterConversations(e.target.value)}
        />
      ) : (
        <div className="font-bold text-[30px] w-[214px]">Chats</div>
      )}
      <button
        type="button"
        onClick={toggleSearchBox}
        className="btn btn-circle bg-[#0DBA4B] text-white border-none hover:bg-green-600 hover:shadow-xl"
      >
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
