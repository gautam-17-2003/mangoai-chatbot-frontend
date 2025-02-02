import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;

    // Generate a unique user ID
    const userId = crypto.randomUUID();
    ``
    // Store in localStorage
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", name);

    // Redirect to the chat page
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
}
