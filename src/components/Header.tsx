import type { ChatTypes } from "../@types/types";

const Header = ({ setChats }: { setChats: (val: ChatTypes[]) => void }) => {
  return (
    <header className="fixed p-3 left-0 z-10">
      <div className="flex items-center justify-between">
        <button 
          className="flex gap-2 bg-white/90 w-fit px-2 py-1 rounded-md font-bold text-sm cursor-pointer"
          onClick={() => setChats([])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21" height="21"
            className="text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <title>New chat</title>
            <path d="M21 15a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 8v6M9 11h6" />
          </svg>
          New Chat
        </button>
      </div>
    </header>
  );
};

export default Header;