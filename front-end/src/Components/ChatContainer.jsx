// import React, { useEffect, useState } from "react";
// import { FaYoutube } from "react-icons/fa6";
// import ChatLists from "./ChatLists";
// import InputText from "./InputText";
// import UserLogin from "./UserLogin";
// import socketIOClient from "socket.io-client";

// const socket = socketIOClient("http://localhost:3002/");

// const ChatContainer = () => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     const avatar = localStorage.getItem("avatar");
//     return storedUser ? { username: storedUser, avatar } : null;
//   });
//   const [chats, setChats] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     // Inform the server about the logged-in user
//     socket.emit("login", user.username);

//     // Listen for user-specific chats
//     socket.on("chat", (userChats) => {
//       setChats(userChats);
//     });

//     // Listen for new messages
//     socket.on("message", (msg) => {
//       setChats((prevChats) => [...prevChats, msg]);
//     });

//     return () => {
//       socket.off("chat");
//       socket.off("message");
//     };
//   }, [user]);

//   const addMessage = (message) => {
//     const newChat = {
//       username: user.username,
//       message,
//       avatar: user.avatar,
//     };
//     socket.emit("newMessage", newChat);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("avatar");
//     setUser(null);
//   };

//   return (
//     <div>
//       {user ? (
//         <div className="home">
//           <div className="chats_header">
//             <h4>Username: {user.username}</h4>
//             <p>
//               <FaYoutube className="chats_icon" /> Code With GANGADHAR
//             </p>
//             <p className="chats_logout" onClick={logout}>
//               <strong>Logout</strong>
//             </p>
//           </div>
//           <ChatLists chats={chats} />
//           <InputText addMessage={addMessage} />
//         </div>
//       ) : (
//         <UserLogin setUser={setUser} />
//       )}
//     </div>
//   );
// };

// export default ChatContainer;


import React, { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa6";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";
import NotificationsIcon from '@mui/icons-material/Notifications';

const socket = socketIOClient("http://localhost:3002/");

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Listen for chats and messages
    socket.on("chat", (chats) => {
      setChats(chats);
    });

    socket.on("message", (msg) => {
      setChats((prevChats) => [...prevChats, msg]);
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.off("chat");
      socket.off("message");
    };
  }, [user]);

  const addMessage = (chat) => {
    const newChat = {
      username: localStorage.getItem("user"),
      message: chat,
      avatar: localStorage.getItem("avatar"),
    };
    socket.emit("newMessage", newChat);
  };

  const resetNotifications = () => {
    setNotificationCount(0);
  };

  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
  };

  return (
    <div>
      {user ? (
        <div className="home">
          <div className="chats_header">
            <h4> Username: {user}</h4>
            <p>
              <FaYoutube className="chats_icon" /> Code With GANGADHAR
            </p>
            <p className="chats_logout" onClick={Logout}>
              <strong>Logout</strong>
            </p>
            <div className="notification_bell" onClick={resetNotifications}>
              <NotificationsIcon />
              {notificationCount > 0 && (
                <span className="notification_count">{notificationCount}</span>
              )}
            </div>
          </div>
          <ChatLists chats={chats} socket={socket} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
