import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function ChatApp() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      router.push("/login"); // Redirect if no user ID
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <Sidebar userId={userId} setCurrentThreadId={setCurrentThreadId} />
      <ChatWindow currentThreadId={currentThreadId} />
    </div>
  );
}
