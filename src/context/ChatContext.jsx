import axios from "axios";

const BASE_URL = "http://localhost:8081/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const fetchConversations = async (userId) => {
  const response = await api.get(`/chat/conversations/${userId}`);
  return response.data;
};

export const fetchMessages = async (conversationId) => {
  const response = await api.get(`/chat/messages/${conversationId}`);
  return response.data;
};

export const sendMessageToDB = async (conversationId, senderId, content) => {
  const response = await api.post("/chat/message", {
    conversationId,
    senderId,
    content,
  });
  return response.data;
};

export const getOrCreateConversation = async (user1, user2) => {
  const response = await api.post("/chat/conversation", {
    user1,
    user2,
  });
  return response.data;
};
