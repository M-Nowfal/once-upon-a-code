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
    setCode("");
    setChats(prev => [...prev, { role: "user", message: code }]);
    setLoading(true);
    const story = await sayStory(code);
    setLoading(false);
    setChats(prev => [...prev, { role: "ai", message: story }]);
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 flex justify-center min-h-svh m-auto">
      <Header setChats={setChats} />
      <div className="relative flex flex-col gap-10 mt-15 w-[95%] max-w-5xl mb-30">
        <Chat chats={chats} />
        {loading && <div className="text-lg font-bold my-5 animate-pulse absolute bottom-0 left-[50%] -translate-x-[50%]">Thinking a Story...</div>}
      </div>
      <InputBox
        code={code}
        setCode={setCode}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default App;