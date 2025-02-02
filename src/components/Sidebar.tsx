import { useState, useEffect } from "react";
import { fetchChats, createChat, deleteChat } from "../services/api";

interface SidebarProps {
  userId: string;
  setCurrentThreadId: (threadId: string) => void;
}

const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  window.location.href = "/login"; // Redirect to login page
};

export default function Sidebar({ userId, setCurrentThreadId }: SidebarProps) {
  const [chats, setChats] = useState<{ _id: string }[]>([]);

  useEffect(() => {
    fetchChats(userId).then(setChats);
  }, [userId]);

  const handleNewChat = async () => {
    const newChat = await createChat(userId);
    if (newChat) {
      setChats([newChat, ...chats]);
      setCurrentThreadId(newChat._id);
    }
  };

  return (
    <div className="w-1/4 p-4 bg-gray-900 text-white">
      <button onClick={handleNewChat} className="w-full p-2 mb-4 bg-blue-600 rounded">
        New Chat
      </button>
      {chats.map((chat) => (
        <div key={chat._id} className="flex justify-between p-2 bg-gray-800 mb-2 rounded">
          <button onClick={() => setCurrentThreadId(chat._id)}>{chat._id.substring(0, 6)}...</button>
          <button onClick={() => deleteChat(chat._id)} className="text-red-500">X</button>
        </div>
      ))}
      <button onClick={handleLogout} className="mt-6 w-full p-2 bg-red-500 rounded">Logout</button>
    </div>
  );
}
