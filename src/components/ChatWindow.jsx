import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, loading, setPrompt, askAI }) {

  const handleSuggestion = (text) => {
    setPrompt(text);
    setTimeout(() => {
      askAI();
    }, 100);
  };

  // Empty screen
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* Title */}
        <h1 className="text-4xl font-semibold mb-10">
          What’s on the agenda today?
        </h1>

        {/* Suggestion cards */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">

          <button
            onClick={() => handleSuggestion("Suggest a startup idea")}
            className="p-4 border rounded-xl hover:bg-base-200 transition text-left"
          >
            💡 Suggest a startup idea
          </button>

          <button
            onClick={() => handleSuggestion("Explain React hooks")}
            className="p-4 border rounded-xl hover:bg-base-200 transition text-left"
          >
            💻 Explain React hooks
          </button>

          <button
            onClick={() => handleSuggestion("How to learn stock trading")}
            className="p-4 border rounded-xl hover:bg-base-200 transition text-left"
          >
            📈 Learn stock trading
          </button>

          <button
            onClick={() => handleSuggestion("Cake shop marketing ideas")}
            className="p-4 border rounded-xl hover:bg-base-200 transition text-left"
          >
            🍰 Cake shop marketing ideas
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      {messages.map((msg, index) => (
        <MessageBubble key={index} msg={msg} />
      ))}

      {loading && (
        <div className="chat chat-start">
          <div className="chat-bubble">
            <span className="loading loading-dots"></span>
          </div>
        </div>
      )}

    </div>
  );
}

export default ChatWindow;