import { useRef, useEffect } from "react";

type InputBoxTypes = {
  code: string;
  setCode: (val: string) => void;
  onSubmit: () => void;
};

const InputBox = ({ code, setCode, onSubmit }: InputBoxTypes) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset before calculating
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl flex items-end gap-2 shadow-md bg-white/90 backdrop-blur-md p-2 rounded-3xl">
      <textarea
        ref={textareaRef}
        className="w-full text-base sm:text-lg outline-0 resize-none max-h-[20rem] px-3 py-2 rounded-xl border border-gray-200 transition-all overflow-auto scrollbar-hide"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
      />
      <button
        className="group cursor-pointer h-[4rem] w-[4rem] bg-purple-100 hover:bg-purple-200 active:bg-purple-300 py-2 px-3 rounded-xl shadow-sm transition-all flex items-center justify-center"
        onClick={onSubmit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="text-green-700 group-hover:scale-110 group-active:scale-95 transition-transform"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </div>
  );
};

export default InputBox;
