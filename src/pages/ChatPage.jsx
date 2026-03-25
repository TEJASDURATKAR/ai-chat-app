import { useState, useRef, useEffect } from "react";

function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  createNewChat,
  setChats,
  isOpen,
  setIsOpen
}) {

  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Rename Chat
  const renameChat = (id) => {
    const name = prompt("Rename chat");
    if (!name) return;

    const updated = chats.map(chat =>
      chat.id === id ? { ...chat, title: name } : chat
    );

    setChats(updated);
  };

  // Delete Chat
  const deleteChat = (id) => {
    const updated = chats.filter(chat => chat.id !== id);
    setChats(updated);

    if (activeChat === id && updated.length > 0) {
      setActiveChat(updated[0].id);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* 🔥 Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen z-50
          w-64 bg-base-200 flex flex-col p-3
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* 🔥 Close button (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden mb-2 text-right"
        >
          ❌
        </button>

        {/* NEW CHAT */}
        <button
          onClick={createNewChat}
          className="btn btn-primary mb-3"
        >
          + New Chat
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search chats"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto space-y-1">

          {filteredChats.map(chat => (

            <div
              key={chat.id}
              onClick={() => {
                setActiveChat(chat.id);
                setIsOpen(false); // 🔥 CLOSE on mobile
              }}
              className={`relative flex justify-between items-center p-2 rounded cursor-pointer
              ${activeChat === chat.id ? "bg-base-300" : "hover:bg-base-300"}`}
            >

              <span className="truncate">
                {chat.title}
              </span>

              {/* MENU BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === chat.id ? null : chat.id);
                }}
              >
                ⋮
              </button>

              {/* MENU */}
              {openMenu === chat.id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 top-8 bg-base-100 shadow-lg rounded w-40 z-50"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      renameChat(chat.id);
                      setOpenMenu(null);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-base-200"
                  >
                    Rename
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                      setOpenMenu(null);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-500 hover:bg-base-200"
                  >
                    Delete
                  </button>
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default Sidebar;