import axios from "axios";

const API_BASE = "http://localhost:8000"; // Update if your backend runs on a different port

// Fetch all chats for a user
export async function fetchChats(userId: string) {
  try {
    const res = await axios.get(`${API_BASE}/get-user-chats/${userId}`);
    return res.data.chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

// Create a new chat
export async function createChat(userId: string) {
  try {
    const res = await axios.post(`${API_BASE}/create-chat/`, { uuid: userId });
    return res.data.chat_data;
  } catch (error) {
    console.error("Error creating chat:", error);
    return null;
  }
}

// Fetch chat history by threadId
export async function fetchChatHistory(threadId: string) {
  try {
    const res = await axios.get(`${API_BASE}/get-chat-history/${threadId}/`);
    return res.data.chat_data;
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return [];
  }
}

// Send a message in a chat
export async function sendMessage(query: string, threadId: string) {
  try {
    const res = await axios.post(`${API_BASE}/query_response/`, { query, thread_id: threadId });
    return res.data.history;
  } catch (error) {
    console.error("Error sending message:", error);
    return [];
  }
}

// Delete a chat
export async function deleteChat(threadId: string) {
  try {
    await axios.delete(`${API_BASE}/delete-chat/${threadId}`);
  } catch (error) {
    console.error("Error deleting chat:", error);
  }
}
