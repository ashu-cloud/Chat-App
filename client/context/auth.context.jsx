import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // =========================
  // CHECK AUTH (ON REFRESH)
  // =========================
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check", {
        headers: { token },
      });

      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // =========================
  // LOGIN
  // =========================
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;

        setToken(data.token);
        setAuthUser(data.userData);
        connectSocket(data.userData);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);

    axios.defaults.headers.common["token"] = null;

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    toast.success("You are logged out successfully");
  };

  // =========================
  // UPDATE PROFILE
  // =========================
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);

      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================
  // CONNECT SOCKET
  // =========================
  const connectSocket = (user) => {
    if (!user || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: user._id },
    });

    // Listen for online users (CASE-SENSITIVE!)
    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("ONLINE USERS:", userIds);
      setOnlineUsers(userIds);
    });

    setSocket(newSocket);
  };

  // =========================
  // INIT AUTH ON PAGE LOAD
  // =========================
  useEffect(() => {
    if (!token) return;

    axios.defaults.headers.common["token"] = token;
    checkAuth();
  }, [token]);

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};
