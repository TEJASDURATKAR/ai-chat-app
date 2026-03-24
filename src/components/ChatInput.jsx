function ChatInput({prompt,setPrompt,askAI}) {

  return (

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

  );
}

export default ChatInput;