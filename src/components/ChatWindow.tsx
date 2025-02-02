import { useState, useEffect } from "react";
import { fetchChatHistory, sendMessage } from "../services/api";

interface ChatWindowProps {
  currentThreadId: string | null;
}

export default function ChatWindow({ currentThreadId }: ChatWindowProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentThreadId) {
      fetchChatHistory(currentThreadId).then((data) => setMessages(data));
    }
  }, [currentThreadId]);

  const handleSendMessage = async () => {
    if (!input.trim() || !currentThreadId) return;
    setLoading(true);
    const updatedMessages = await sendMessage(input, currentThreadId);
    setMessages(updatedMessages);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="w-3/4 flex flex-col h-screen bg-gray-100 p-6">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto border border-gray-300 p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 mb-2 max-w-xs rounded-lg ${msg.role === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500 text-center">Generating response...</p>}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex items-center">
        <input
          className="flex-1 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className={`ml-3 p-3 bg-green-500 text-white rounded-lg shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
