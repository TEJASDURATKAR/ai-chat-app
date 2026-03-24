import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chat() {

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAI = async () => {

    if (!prompt.trim()) return;

    const userMessage = { role: "user", text: prompt };

    setMessages(prev => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { prompt }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (

    <div className="flex h-screen bg-base-200">

      {/* Sidebar */}
      <div className="w-64 bg-base-300 p-4 flex flex-col">

        <h2 className="text-xl font-bold mb-4">TEJAS AI</h2>

        <button
          className="btn btn-primary mb-4"
          onClick={() => setMessages([])}
        >
          + New Chat
        </button>

        <div className="text-sm opacity-60">
          Conversations coming soon
        </div>

      </div>


      {/* Chat Area */}
      <div className="flex-1 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`chat ${
                msg.role === "user" ? "chat-end" : "chat-start"
              }`}
            >

              <div className="chat-bubble">

                {msg.text}

              </div>

            </div>

          ))}

          {loading && (
            <div className="chat chat-start">
              <div className="chat-bubble">
                <span className="loading loading-dots loading-md"></span>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>

        </div>


        {/* Input */}
        <div className="p-4 border-t flex gap-2">

          <input
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            placeholder="Ask anything..."
            className="input input-bordered w-full"
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                askAI();
              }
            }}
          />

          <button
            className="btn btn-primary"
            onClick={askAI}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );
}

export default Chat;