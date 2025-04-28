import React, { useState, useRef, useEffect } from "react";
import {
  fetchConversations,
  fetchMessages,
  sendMessageToDB,
  getOrCreateConversation,
} from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import { useWebSocket } from "../context/WebSocketContext";
import {
  UilSearch,
  UilPlusCircle,
  UilArrowLeft,
  UilEllipsisV,
  UilMessage,
} from "@iconscout/react-unicons";

const ChatApp = () => {
  // const { userEmail } = useUser();
  const { userEmail } = useUser();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newParticipant, setNewParticipant] = useState("");
  const [showInput, setShowInput] = useState(false);
  const { stompClient, isConnected, sendMessage } = useWebSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      const subscription = stompClient.subscribe(
        "/topic/messages",
        (message) => {
          const parsed = JSON.parse(message.body);

          setMessages((prev) => {
            const exists = prev.some(
              (msg) =>
                msg.content === parsed.content &&
                msg.senderId === parsed.senderId &&
                msg.conversationId === parsed.conversationId &&
                !msg.timestamp?.startsWith("Invalid")
            );

            if (!exists && parsed.conversationId === selectedChat?.id) {
              return [...prev, parsed];
            }

            return prev;
          });
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient, selectedChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: "ping", text: "hello" });
    }
  }, [isConnected]);

  const handleStartNewConversation = async () => {
    if (!newParticipant || newParticipant === userEmail) return;

    try {
      const conversation = await getOrCreateConversation(
        userEmail,
        newParticipant
      );

      const exists = conversations.some((conv) => conv.id === conversation.id);
      if (!exists) {
        setConversations((prev) => [...prev, conversation]);
      }

      setSelectedChat(conversation);
      setNewParticipant("");
      setShowInput(false);
    } catch (err) {
      console.error("Failed to start new conversation:", err);
    }
  };

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const data = await fetchConversations(userEmail);
        setConversations(data || []);
      } catch (err) {
        setError("Failed to load conversations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) loadConversations();
  }, [userEmail]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedChat) {
        try {
          const data = await fetchMessages(selectedChat.id);
          setMessages(data || []);
        } catch (err) {
          console.error("Failed to load messages:", err);
        }
      }
    };
    loadMessages();
  }, [selectedChat]);

  const getOtherParticipant = (participants) => {
    return participants.find((p) => p !== userEmail) || "Unknown";
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const localId = Date.now();
    const newMessage = {
      conversationId: selectedChat.id,
      senderId: userEmail,
      content: message,
      localId,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    sendMessage(newMessage);
    setMessage("");
  };

  if (loading) return <div>Loading conversations...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto h-[700px] flex flex-col">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-800">Messages</h1>
      </div>

      <div className="flex flex-1 overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Conversations sidebar */}
        <div className="w-1/4 border-r border-gray-200 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <UilSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scroll-custom">
            <ul className="space-y-1 p-2">
              {conversations.map((conversation) => {
                const otherParticipant = getOtherParticipant(
                  conversation.participantIds
                );
                return (
                  <li
                    key={conversation.id}
                    className={`p-3 rounded-lg transition-colors duration-200 ${
                      selectedChat?.id === conversation.id
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedChat(conversation)}
                  >
                    <div className="font-medium text-gray-800 truncate">
                      {otherParticipant}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {conversation.lastMessage?.content || "No messages yet"}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* New conversation button */}
          <div className="p-4 border-t border-gray-200">
            {showInput ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="userEmail to message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleStartNewConversation()
                  }
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (newParticipant.trim()) {
                      handleStartNewConversation();
                    }
                    setShowInput(false);
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <UilArrowLeft size="20" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="flex items-center space-x-2 w-full p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <UilPlusCircle size="20" />
                <span>New conversation</span>
              </button>
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex flex-col flex-1 bg-white">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {getOtherParticipant(selectedChat.participantIds)
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {getOtherParticipant(selectedChat.participantIds)}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {messages.length > 0
                        ? `Last active: ${new Date(
                            messages[messages.length - 1].timestamp
                          ).toLocaleTimeString()}`
                        : "No messages yet"}
                    </p>
                  </div>
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <UilEllipsisV size="20" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 scroll-custom">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id || msg.localId}
                      className={`flex ${
                        msg.senderId === userEmail
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl ${
                          msg.senderId === userEmail
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            msg.senderId === userEmail
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-white p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <UilMessage size="18" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center p-6 rounded-xl bg-white shadow-sm max-w-md mx-auto">
                <div className="text-blue-400 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  No conversation selected
                </h3>
                <p className="text-gray-500 mb-4">
                  Choose an existing conversation or start a new one
                </p>
                <button
                  onClick={() => setShowInput(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start New Conversation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
