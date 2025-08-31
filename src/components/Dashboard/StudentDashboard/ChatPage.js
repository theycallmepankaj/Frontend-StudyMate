import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "../../auth/Auth";
import { FaCircle, FaUser } from "react-icons/fa";
import "./ChatPage.css";

const SOCKET_URL = "https://backend-studymate-1.onrender.com"; // backend socket url
const API_URL = "https://backend-studymate-1.onrender.com";   // backend REST

const ChatPrivate = () => {
  const [myId, setMyId] = useState("");
  const [myName, setMyName] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [userList, setUserList] = useState([]);

  const socket = useMemo(
    () =>
      io(SOCKET_URL, {
         transports: ["websocket", "polling"],
        withCredentials: true,
      }),
    []
  );


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

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setMyId(user._id);
      setMyName(user.name);
      socket.emit("register", user._id);
    }
  }, [socket]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // get all users
  useEffect(() => {
    axios
      .get(`${API_URL}/user`)
      .then((res) => {
        const users = res.data.findUser || res.data;
        setUserList(users);
      })
      .catch((err) => console.warn("Could not fetch users:", err.message));
  }, []);

  // socket listeners
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
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: msg.sender._id === myId ? "sent" : "received",
      };

      setMessages((prev) =>
        prev.some((m) => m.id === mapped.id) ? prev : [...prev, mapped]
      );
    }

    function onPrivateMessageSent(payload) {
      const { tempId, message } = payload;
      const mapped = {
        id: message._id,
        senderId: message.sender._id,
        senderName: message.sender.name,
        receiverId: message.receiver._id,
        receiverName: message.receiver.name,
        text: message.message,
        time: new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: message.sender._id === myId ? "sent" : "received",
      };

      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === tempId);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx] = mapped;
          return copy;
        }
        return prev.some((m) => m.id === mapped.id) ? prev : [...prev, mapped];
      });
    }

    socket.on("private_message", onPrivateMessage);
    socket.on("private_message_sent", onPrivateMessageSent);
    socket.on("online_users", setOnlineUsers);

    return () => {
      socket.off("private_message", onPrivateMessage);
      socket.off("private_message_sent", onPrivateMessageSent);
      socket.off("online_users", setOnlineUsers);
      // socket.disconnect();
    };
  }, [socket, myId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // load conversation when selectedUser changes
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
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: msg.sender._id === myId ? "sent" : "received",
        }));
        setMessages(mapped);
      })
      .catch(() => setMessages([]));
  }, [myId, selectedUser]);

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
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
      pending: true,
    };

    setMessages((prev) => [...prev, tempMessage]);

    socket.emit("private_message", {
      tempId,
      senderId: myId,
      receiverId: selectedUser._id,
      text: currentMessage,
    });

    setCurrentMessage("");
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
              className={`user-item ${selectedUser?._id === u._id ? "active" : ""
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
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
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
                  className={`message ${m.type === "sent" ? "sent" : "received"}`}
                >
                  <p>{m.text}</p>
                  <span className="time">
                    {m.time}
                    {m.pending ? " • sending..." : ""}
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
