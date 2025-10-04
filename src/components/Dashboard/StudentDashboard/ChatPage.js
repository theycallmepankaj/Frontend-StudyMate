import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "../../auth/Auth";
import { FaCircle } from "react-icons/fa";
import "./ChatPage.css";

const SOCKET_URL = "http://localhost:3000";
const API_URL = "http://localhost:3000";

const ChatPrivate = () => {
  const [myId, setMyId] = useState("");
  const [myName, setMyName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userList, setUserList] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({}); // 🔥 track unread messages

  const socket = useMemo(
    () =>
      io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        withCredentials: true,
      }),
    []
  );

  const messagesEndRef = useRef(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Connect socket
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [socket]);

  // Register user on socket
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setMyId(user._id);
      setMyName(user.name);
      socket.emit("register", user._id);
    }
  }, [socket]);

  // Fetch all users
  useEffect(() => {
    axios
      .get(`${API_URL}/user`)
      .then((res) => {
        const users = res.data.findUser || res.data;
        setUserList(users);
      })
      .catch((err) => console.warn("Could not fetch users:", err.message));
  }, []);

  // Socket message handling
  useEffect(() => {
    function onPrivateMessage(payload) {
      const msg = payload.message;
      const mapped = {
        id: msg._id,
        senderId: msg.sender._id,
        senderName: msg.sender.name,
        receiverId: msg.receiver._id,
        receiverName: msg.receiver.name,
        text: msg.message,
        time: new Date(msg.createdAt).getTime(),
        type: msg.sender._id === myId ? "sent" : "received",
      };

      setMessages((prev) =>
        prev.some((m) => m.id === mapped.id) ? prev : [...prev, mapped]
      );

      // 🔥 If message is received & not the currently selected chat, increment unread
      if (msg.receiver._id === myId && selectedUser?._id !== msg.sender._id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.sender._id]: (prev[msg.sender._id] || 0) + 1,
        }));
      }

      // 🔥 Move sender to top in chat list
      setUserList((prev) => {
        const reordered = [...prev];
        const senderIndex = reordered.findIndex((u) => u._id === msg.sender._id);
        if (senderIndex > -1) {
          const [senderUser] = reordered.splice(senderIndex, 1);
          reordered.unshift(senderUser);
        }
        return reordered;
      });
    }

    socket.on("private_message", onPrivateMessage);
    socket.on("online_users", setOnlineUsers);

    return () => {
      socket.off("private_message", onPrivateMessage);
      socket.off("online_users", setOnlineUsers);
    };
  }, [socket, myId, selectedUser]);

  // Scroll bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversation when selectedUser changes
  useEffect(() => {
    if (!myId || !selectedUser) return;

    const otherId = selectedUser._id;
    axios
      .get(`${API_URL}/chat/conversation/${myId}/${otherId}`)
      .then((res) => {
        const msgs = res.data.messages || [];
        const mapped = msgs.map((msg) => ({
          id: msg._id,
          senderId: msg.sender._id,
          senderName: msg.sender.name,
          receiverId: msg.receiver._id,
          receiverName: msg.receiver.name,
          text: msg.message,
          time: new Date(msg.createdAt).getTime(),
          type: msg.sender._id === myId ? "sent" : "received",
        }));
        setMessages(mapped);

        // 🔥 reset unread count
        setUnreadCounts((prev) => ({ ...prev, [selectedUser._id]: 0 }));
      })
      .catch(() => setMessages([]));
  }, [myId, selectedUser]);

  // Send message
  const sendMessage = () => {
    if (!currentMessage.trim() || !selectedUser) return;
    const tempId = uuidv4();
    const tempMessage = {
      id: tempId,
      senderId: myId,
      senderName: myName || "You",
      receiverId: selectedUser._id,
      receiverName: selectedUser.name,
      text: currentMessage,
      time: new Date().getTime(),
      type: "sent",
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("private_message", {
      tempId,
      senderId: myId,
      receiverId: selectedUser._id,
      text: currentMessage,
    });

    setCurrentMessage("");

    // 🔥 Move this user to top
    setUserList((prev) => {
      const reordered = [...prev];
      const index = reordered.findIndex((u) => u._id === selectedUser._id);
      if (index > -1) {
        const [sel] = reordered.splice(index, 1);
        reordered.unshift(sel);
      }
      return reordered;
    });
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h3>Chats</h3>
        <div className="user-list">
          {userList?.map((u) => (
            <div
              key={u._id}
              className={`user-item ${
                selectedUser?._id === u._id ? "active" : ""
              }`}
              onClick={() => setSelectedUser(u)}
            >
              <img
                src={
                  u?.profile?.imageName
                    ? `${API_URL}/profile/${u?.profile?.imageName}`
                    : "/default-avatar.png"
                }
                alt={u?.name}
                className="user-avatar"
              />
              <div className="user-info">
                <span>{u?.name}</span>
                {onlineUsers.find((ou) => ou.id === u._id) && (
                  <FaCircle className="online-dot" />
                )}
              </div>
              {/* 🔥 Unread badge */}
              {unreadCounts[u._id] > 0 && (
                <span className="unread-badge">{unreadCounts[u._id]}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="chat-window">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img
                src={
                  selectedUser?.profile?.imageName
                    ? `${API_URL}/profile/${selectedUser?.profile?.imageName}`
                    : "/default-avatar.png"
                }
                alt={selectedUser?.name}
                className="header-avatar"
              />
              <h4>{selectedUser?.name}</h4>
            </div>

            <div className="chat-messages">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`message ${
                    m.type === "sent" ? "sent" : "received"
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="time">
                    {new Date(m.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder={`Message ${selectedUser?.name}`}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder">
            <h3>Select a user to start chatting</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPrivate;
