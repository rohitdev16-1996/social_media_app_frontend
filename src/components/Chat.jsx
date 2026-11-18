import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();

  /* For the Message Area */
  const [messages, setMessages] = useState([]);

  /* For Input Box */
  const [newMessage, setNewMessage] = useState("");

  /* Get the user from the from the store */
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  /* Get the connections to get the details of the User we are chatting with like User Name etc. */
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  /* Get the user we are chatting to from connections */
  const targetUser = connections?.find(
    (connection) => connection._id === targetUserId,
  );

  /* Get the connections from the database */
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
  };

  /* If the page was refreshed, the store will be empty, so load the connections again */
  useEffect(() => {
    if (connections) return;

    fetchConnections();

    /* Wait until the user is loaded */
    if (!userId) return;

    const socket = createSocketConnection();

    /* As soon as the page loads, socket connections is made and join the chat */
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    /* Update the messages in the message area which are broadcast in the room */
    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " : " + newMessage);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    /* This will ensure the performance is not hampered */
    return () => {
      /* When the component unmounts the return function is called. */
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    /* Outer Container */
    <div className="max-w-3xl mx-auto px-4 my-6">
      <div className="flex flex-col h-[75vh] rounded-box bg-base-300 shadow-md overflow-hidden">
        {/* 1. Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-base-100">
          {/* 1.1. Link to the Connections Component from the Chat Window */}
          <Link to="/connections" className="btn btn-ghost btn-sm btn-circle">
            ←
          </Link>

          {/* 1.2. Image of the Target User */}
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={targetUser?.photoUrl || "https://placehold.co/80x80"}
                alt={targetUser?.firstName || "User"}
              />
            </div>
          </div>

          {/* 1.3. First Name and Last Name of the User */}
          <div>
            <h2 className="font-semibold leading-tight">
              {targetUser
                ? targetUser.firstName + " " + targetUser.lastName
                : "Chat"}
            </h2>
          </div>
        </div>

        {/* 2. Message Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => {
            /* My messages on the right, the other person's on the left */
            const isMine = msg.firstName === user?.firstName;

            return (
              <div
                key={index}
                className={"chat " + (isMine ? "chat-end" : "chat-start")}
              >
                <div className="chat-header">{msg.firstName}</div>
                <div
                  className={
                    "chat-bubble " + (isMine ? "chat-bubble-primary" : "")
                  }
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Input Area */}
        <div className="flex items-center gap-2 p-3 border-t border-base-100">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
