import { memo, useState } from "react";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = memo(() => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex w-full overflow-hidden surface-primary h-screen">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        fixed lg:relative
        inset-y-0 left-0 z-50
        w-full lg:w-auto
        transition-transform duration-300 ease-out-expo
        lg:transition-none
      `}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Mobile header with menu button - always visible on mobile */}
        <div className="lg:hidden surface-primary border-b border-neutral-200 px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-primary font-display">
            ZenChat
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <MessageContainer />
      </div>
    </div>
  );
});

Home.displayName = "Home";

export default Home;
