import { useEffect, useRef, useState } from "react";
import type { ChatTypes } from "../@types/types";

const Chat = ({ chats }: { chats: ChatTypes[] }) => {

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    return () => clearTimeout(timer);
  }, [chats]);

  const handleCopy = (text: string): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }
  }

  return (
    <>
      {chats.length > 0 && chats.map(({ role, message }, index) => (
        <div key={index}>
          <div className={`${role === "ai" ? "me-auto rounded-bl-none bg-white/50" : "ms-auto max-w-2xl rounded-br-none bg-black/50 text-white"} p-5 rounded-2xl`}>
            <pre className="text-wrap">
              <code>{message}</code>
            </pre>
          </div>
          <button
            className={`
              flex items-center gap-2 mt-3 p-1 px-2 rounded-lg w-fit transition-all
              ${role === "ai" ? "me-auto bg-white/50 hover:bg-white/80" : "ms-auto bg-black/50 text-white hover:bg-black/70"} cursor-pointer
            `}
            onClick={() => handleCopy(message)}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="22" height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span className="font-bold">Copy</span>
          </button>
        </div>
      ))
      }
      {isCopied && <div className="fixed bottom-30 left-[50%] -translate-x-[50%] z-10 bg-gray-400 px-2 rounded-md text-white font-semibold shadow">
        Copied to clipboard
      </div>}
      <div ref={bottomRef} />
    </>
  );
}

export default Chat;
