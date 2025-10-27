import { useState, useCallback, useMemo, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import useDebounce from "../../hooks/useDebounce";
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
  const [inputValue, setInputValue] = useState("");

  // Debounce the search input to prevent excessive filtering
  const debouncedSearch = useDebounce(inputValue, 300);

  // Memoize the filtered conversations to prevent recalculation on every render
  const filteredConversationsMemo = useMemo(() => {
    if (!debouncedSearch) {
      return [];
    }

    const filtered = conversations.filter((conversation) =>
      conversation.fullName
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );

    // Sort the filtered array by the starting value
    return filtered.sort((a, b) => {
      const nameA = a.fullName.toLowerCase();
      const nameB = b.fullName.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }, [conversations, debouncedSearch]);

  // Update filtered conversations when debounced search changes
  useEffect(() => {
    setFilteredConversations(filteredConversationsMemo);
    setSearch(debouncedSearch);
  }, [
    filteredConversationsMemo,
    debouncedSearch,
    setFilteredConversations,
    setSearch,
  ]);

  const filterConversations = useCallback((value) => {
    setInputValue(value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!search) return;
      if (search.length < 3) {
        return toast.error("Search term must be at least 3 characters long");
      }

      if (filteredConversations.length > 0) {
        const conversation = filteredConversations[0];
        setSelectedConversation(conversation);
        setSearch("");
        setInputValue("");
      } else {
        toast.error("No such user found!");
      }
    },
    [search, filteredConversations, setSelectedConversation, setSearch]
  );

  const toggleSearchBox = useCallback(() => {
    setSearchBox(!searchBox);
  }, [searchBox]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-3 p-3"
    >
      {searchBox ? (
        <input
          type="text"
          placeholder="Search…"
          className="input-modern rounded-full transition-all duration-300 ease-out"
          value={inputValue}
          onChange={(e) => filterConversations(e.target.value)}
        />
      ) : (
        <div className="font-bold text-2xl text-neutral-800 font-display">
          Chats
        </div>
      )}
      <button
        type="button"
        onClick={toggleSearchBox}
        className="btn-primary rounded-full w-10 h-10 p-0 hover:scale-105 transition-transform duration-200"
      >
        <IoSearchSharp className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchInput;
