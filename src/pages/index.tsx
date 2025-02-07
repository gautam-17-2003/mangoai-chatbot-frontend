import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import axios from "axios";

export default function ChatApp() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [chats, setChats] = useState([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [chatUpdated, setChatUpdated] = useState(false); // Track when a message is sent


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login");
    } else {
      setUserId(storedUserId);
      axios.get(`http://localhost:8000/get-user-chats/${storedUserId}`).then((res) => setChats(res.data.chats));
    }
  }, [router]);

  return userId ? (
    <div className="flex h-screen">
      <Sidebar userId={userId} currentThreadId={currentThreadId} setCurrentThreadId={setCurrentThreadId} chatUpdated={chatUpdated}/>
      <ChatWindow currentThreadId={currentThreadId} setChatUpdated={setChatUpdated}/>
    </div>
  ) : (
    <div>Loading...</div>
  );
}