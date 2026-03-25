import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function ChatPage() {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  // store all chats
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("ai-chats");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, title: "New Chat", messages: [] }];
  });

  useEffect(() => {
    localStorage.setItem("ai-chats", JSON.stringify(chats));
  }, [chats]);

  const [activeChat, setActiveChat] = useState(() => {
    return JSON.parse(localStorage.getItem("active-chat")) || 1;
  });
  useEffect(() => {
    localStorage.setItem("active-chat", JSON.stringify(activeChat));
  }, [activeChat]);

  const currentChat = chats.find((chat) => chat.id === activeChat);

  const askAI = async () => {
    if (!prompt.trim()) return;

    const userMessage = {
      role: "user",
      text: prompt,
      time: new Date().toLocaleTimeString(),
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        // update title if first message
        const newTitle =
          chat.messages.length === 0 ? prompt.slice(0, 30) : chat.title;

        return {
          ...chat,
          title: newTitle,
          messages: [...chat.messages, userMessage],
        };
      }

      return chat;
    });

    setChats(updatedChats);
    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("https://ai-chat-api-n772.onrender.com/api/ai/chat", {
        prompt,
      });

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
        time: new Date().toLocaleTimeString(),
      };
      const newChats = updatedChats.map((chat) => {
        if (chat.id === activeChat) {
          return {
            ...chat,
            messages: [...chat.messages, aiMessage],
          };
        }
        return chat;
      });

      setChats(newChats);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

 return (
  <div className="h-screen flex flex-col overflow-hidden">

    <Navbar />

   <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        createNewChat={createNewChat}
        setChats={setChats}
      />

      <div className="flex flex-col flex-1 h-full">

        <ChatWindow
          messages={currentChat?.messages || []}
          loading={loading}
          setPrompt={setPrompt}
          askAI={askAI}
        />

        <ChatInput
          prompt={prompt}
          setPrompt={setPrompt}
          askAI={askAI}
        />

      </div>

    </div>

  </div>
);
}

export default ChatPage;
