import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useContext,
} from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/chatContext.jsx";
import { authContext } from "../../context/auth.context.jsx";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
  } = useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(authContext);

  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  // Scroll helper
  const scrollToBottom = () => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  };

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Auto-scroll
  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // Send image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  // Empty state
  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 bg-white/10 max-md:hidden">
        <img src={assets.logo_icon} alt="" className="w-16" />
        <p className="text-lg font-medium text-white">
          Chat anytime anywhere
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />

        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {Array.isArray(onlineUsers) &&
            onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500" />
            )}
        </p>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer"
        />
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-4"
      >
        {messages.map((msg, index) => {
          const isMe = msg.senderId === authUser._id;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  onLoad={scrollToBottom}
                  className="max-w-[230px] rounded-lg border border-gray-700"
                />
              ) : (
                <p
                  className={`px-3 py-2 max-w-[220px] text-sm rounded-lg text-white ${
                    isMe
                      ? "bg-violet-500/30 rounded-br-none"
                      : "bg-gray-500/30 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              <div className="text-center text-xs">
                <img
                  src={
                    isMe
                      ? authUser.profilePic || assets.avatar_icon
                      : selectedUser.profilePic || assets.avatar_icon
                  }
                  alt=""
                  className="w-7 rounded-full mx-auto"
                />
                <p className="text-gray-400">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-3 px-4 py-3"
      >
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 bg-transparent outline-none text-white"
          />

          <input onChange={handleSendImage} type="file" id="image" hidden />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>

        <button type="submit">
          <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
