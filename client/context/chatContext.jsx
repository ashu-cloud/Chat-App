import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "./auth.context.jsx";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(authContext);

  // ✅ GET USERS FOR SIDEBAR
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/messages/users");

      console.log("RAW /users RESPONSE:", res.data);

      const usersFromApi =
        res.data?.users || res.data?.data || res.data || [];

      setUsers(usersFromApi);

      if (res.data?.unseenMessages) {
        setUnseenMessages(res.data.unseenMessages);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  // ✅ GET MESSAGES FOR SELECTED USER
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data?.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  };

  // ✅ SEND MESSAGE
  const sendMessage = async (messagesData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messagesData
      );

      if (data?.newMessage) {
        setMessages((prev) => [...prev, data.newMessage]);
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  // ✅ SOCKET SUBSCRIPTION
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
