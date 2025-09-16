import { useEffect, useRef } from "react";
import type { ChatTypes } from "../@types/types";

const Chat = ({ chats }: { chats: ChatTypes[] }) => {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <>
      {chats.length > 0 && chats.map(({ role, message }, index) => (
        <div key={index}>
          <div className={`${role === "ai" ? "me-auto" : "ms-auto max-w-2xl"} p-5 rounded-xl bg-white/60`}>
            <pre className="text-wrap">
              <code>{message}</code>
            </pre>
          </div>
          <div className={`flex items-center gap-2 mt-3 bg-white/50 hover:bg-white/80 p-1 px-2 rounded-lg w-fit ${role === "ai" ? "me-auto" : "ms-auto"} cursor-pointer`}>
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
          </div>
        </div>
      ))
      }
      < div ref={bottomRef} />
    </>
  );
}

export default Chat;
