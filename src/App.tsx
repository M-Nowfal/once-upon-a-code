import { useState } from "react";
import Chat from "./components/Chat";
import Header from "./components/Header";
import InputBox from "./components/InputBox";
import type { ChatTypes } from "./@types/types";
import sayStory from "./lib/openRouter";

const App = () => {

  const [code, setCode] = useState<string>("");
  const [chats, setChats] = useState<ChatTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!code.trim()) return;
    setChats(prev => [...prev, { role: "user", message: code }]);
    setLoading(true);
    const story = await sayStory(code);
    setLoading(false);
    setChats(prev => [...prev, { role: "ai", message: story }]);
    setCode("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 flex justify-center min-h-svh m-auto">
      <Header setChats={setChats} />
      <div className="relative flex flex-col gap-10 mt-15 w-[95%] max-w-5xl mb-30">
        <Chat chats={chats} />
        {loading && <div className="text-lg font-bold my-5 animate-pulse absolute bottom-0 left-[50%] -translate-x-[50%]">Thinking a Story...</div>}
      </div>
      {chats.length === 0 && <div className="absolute bottom-[50%] text-center">
        <h1 className="text-3xl md:text-5xl font-bold">Once upon a Code</h1>
        <p className="mt-5 font-semibold">Enter your code and make it an interesting story</p>
      </div>}
      <InputBox
        code={code}
        setCode={setCode}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default App;