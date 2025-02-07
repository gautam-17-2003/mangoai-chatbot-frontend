import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link"; // Import Link for navigation

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) return alert("All fields are required!");

    try {
      const res = await axios.post("http://localhost:8000/signup/", { name, email, password });
      localStorage.setItem("userId", res.data.uuid);
      localStorage.setItem("userName", name);
      router.push("/");
    } catch (error) {
      alert(error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <input className="w-full p-2 border rounded mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={handleSignup}>Sign Up</button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}