import { TypeAnimation } from "react-type-animation";

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      {/* <div className="bg-red-500 text-white p-2">🤖</div> */}
      
      {/* 🤖 AI Avatar */}
      {!isUser && (
  <div className="chat-image avatar">
    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow">
      🤖
    </div>
  </div>
)}

      {/* 💬 Bubble */}
      <div
        className={`chat-bubble ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-white"
        }`}
      >
        {/* 🧠 AI typing animation */}
        {msg.loading ? (
          <TypeAnimation
            sequence={[
              "Thinking...",
              1000,
              "Generating response...",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        ) : (
          <p className="whitespace-pre-wrap">{msg.text}</p>
        )}
      </div>

      {/* ⏱️ Time */}
      <div className="text-xs opacity-50 mt-1">
        {msg.time}
      </div>

    </div>
  );
}

export default MessageBubble;