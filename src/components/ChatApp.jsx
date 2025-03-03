import React, { useState, useEffect } from "react";

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);

  // محاكاة جلب البيانات من قاعدة بيانات مستقبلية
  useEffect(() => {
    fetchConversations();
    fetchMessages();
  }, []);

  const fetchConversations = async () => {
    // لاحقًا سيتم استبدال هذا بكود يجلب البيانات من API أو قاعدة بيانات
    const fakeData = [
      { id: 1, name: "Aryam", message: "Hello, how are you today?", time: "Dec 08", unread: false },
      { id: 2, name: "Shahad", message: "Hello, how are you today?", time: "Dec 08", unread: true },
      { id: 3, name: "Ahad", message: "Hello, how are you today?", time: "Dec 08", unread: true },
      { id: 4, name: "Smith", message: "Hello, how are you today?", time: "Dec 08", unread: false },
    ];
    setConversations(fakeData);
  };

  const fetchMessages = async () => {
    // لاحقًا سيتم استبدال هذا بجلب المحادثات من قاعدة بيانات
    const fakeMessages = [
      { sender: "Shahad", text: "Hello, any updates on the project?", time: "12:38" },
      { sender: "You", text: "Yes, I will send them shortly.", time: "12:42" },
      { sender: "Shahad", text: "Great! Let me know if you need any assistance.", time: "12:49" },
      { sender: "You", text: "Sure, thank you!", time: "12:57" },
    ];
    setMessages(fakeMessages);
  };

  const filteredConversations = conversations.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendMessageToDB = async (newMessage) => {
    // لاحقًا سيتم استبداله بحفظ البيانات في قاعدة بيانات
    setMessages([...messages, newMessage]);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        sender: "Nora",
        text: message,
        time: new Date().toLocaleTimeString(),
      };
      sendMessageToDB(newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 border-r bg-white p-4">
        <h2 className="text-lg font-bold mb-4 text-blue-800">Messages</h2>
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full p-2 mb-4 border rounded-lg bg-blue-100 text-blue-800 placeholder-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredConversations.map((chat) => (
            <li key={chat.id} className={`flex items-center p-3 cursor-pointer rounded-lg hover:bg-blue-200 ${selectedChat === chat.id ? "bg-blue-300" : ""}`} onClick={() => setSelectedChat(chat.id)}>
              <div>
                <h3 className="font-semibold text-blue-800">{chat.name}</h3>
                <p className="text-sm text-gray-500">{chat.message}</p>
              </div>
              <span className="text-xs text-gray-400 ml-auto">{chat.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-1 bg-white">
        <div className="p-4 border-b flex justify-between items-center bg-blue-100">
          <h2 className="text-lg font-bold text-blue-800">{selectedChat ? conversations.find(chat => chat.id === selectedChat)?.name : "Select a chat"}</h2>
          <div className="flex space-x-4">
            <span className="cursor-pointer text-blue-800">🔍</span>
            <span className="cursor-pointer text-blue-800">📞</span>
            <span className="cursor-pointer text-blue-800">⋮</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex mb-4 ${msg.sender === "You" ? "justify-end" : ""}`}>
              <div className={`p-3 rounded-lg max-w-md ${msg.sender === "You" ? "bg-blue-700 text-white" : "bg-gray-200"}`}>
                <p>{msg.text}</p>
                <span className="text-xs text-gray-500 block mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t flex bg-blue-100">
          <input 
            type="text" 
            placeholder="Your message..." 
            className="flex-1 p-2 border rounded-lg bg-white text-blue-800 placeholder-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

