
// // import React, { useEffect, useRef } from 'react';

// // const ChatLists = ({ chats }) => {
// //   const endOfMessages = useRef(null);
// //   const user = localStorage.getItem('user');

// //   const scrollToBottom = () => {
// //     endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [chats]);

// //   const SenderChat = ({ message, username, avatar }) => (
// //     <div className="chat_sender">
// //       <img src={avatar} alt="Avatar" />
// //       <p>
// //         <strong>{username}</strong> <br />
// //         {message}
// //       </p>
// //     </div>
// //   );

// //   const ReceiverChat = ({ message, username, avatar }) => (
// //     <div className="chat_receiver">
// //       <img src={avatar} alt="Avatar" />
// //       <p>
// //         <strong>{username}</strong> <br />
// //         {message}
// //       </p>
// //     </div>
// //   );

// //   return (
// //     <div className="chats_list">
// //       {chats.map((chat, index) => (
// //         chat.username === user ? (
// //           <SenderChat key={index} {...chat} />
// //         ) : (
// //           <ReceiverChat key={index} {...chat} />
// //         )
// //       ))}
// //       <div ref={endOfMessages}></div>
// //     </div>
// //   );
// // };

// // export default ChatLists;


// import React, { useEffect, useRef } from 'react';

// const ChatLists = ({ chats }) => {
//   const endOfMessages = useRef(null);
//   const user = localStorage.getItem('user');

//   // Scroll to the bottom when chats are updated
//   useEffect(() => {
//     endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [chats]);

//   return (
//     <div className="chats_list">
//       {chats.map((chat, index) => {
//         const isSender = chat.username === user;
//         return (
//           <div
//             key={index}
//             className={`chat_bubble ${isSender ? 'chat_sender' : 'chat_receiver'}`}
//           >
//             <img
//               className="chat_avatar"
//               src={chat.avatar || 'https://via.placeholder.com/50'}
//               alt="Avatar"
//             />
//             <div className="chat_content">
//               <p className="chat_username">
//                 <strong>{chat.username}</strong>
//               </p>
//               <p className="chat_message">{chat.message}</p>
//             </div>
//           </div>
//         );
//       })}
//       <div ref={endOfMessages} />
//     </div>
//   );
// };

// export default ChatLists;

// import React, { useEffect, useRef } from 'react';
// import { FaTrash } from 'react-icons/fa'; // Import FontAwesome Trash Icon

// const ChatLists = ({ chats, setChats, socket }) => {
//   const endOfMessages = useRef(null);
//   const user = localStorage.getItem('user');  // Get the logged-in user

//   // Scroll to the bottom whenever the chats update
//   const scrollToBottom = () => {
//     endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chats]);

//   // Function to handle deleting a message
//   const handleDeleteMessage = (messageId) => {
//     socket.emit('deleteMessage', messageId); // Emit deleteMessage event to the server
//   };

//   // Component to render the sender's chat message
//   const SenderChat = ({ message, username, avatar, id }) => (
//     <div className="chat_sender">
//       <img src={avatar} alt="Avatar" />
//       <p>
//         <strong>{username}</strong> <br />
//         {message}
//       </p>
//       <button className="delete_button" onClick={() => handleDeleteMessage(id)}>
//         <FaTrash /> {/* Render delete icon */}
//       </button>
//     </div>
//   );

//   // Component to render the receiver's chat message
//   const ReceiverChat = ({ message, username, avatar, id }) => (
//     <div className="chat_receiver">
//       <img src={avatar} alt="Avatar" />
//       <p>
//         <strong>{username}</strong> <br />
//         {message}
//       </p>
//       <button className="delete_button" onClick={() => handleDeleteMessage(id)}>
//         <FaTrash /> {/* Render delete icon */}
//       </button>
//     </div>
//   );

//   return (
//     <div className="chats_list">
//       {chats.map((chat) => (
//         chat.username === user ? (
//           <SenderChat key={chat.id} {...chat} />
//         ) : (
//           <ReceiverChat key={chat.id} {...chat} />
//         )
//       ))}
//       <div ref={endOfMessages}></div>
//     </div>
//   );
// };

// export default ChatLists;



import React, { useEffect, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';

const ChatLists = ({ chats, setChats, socket }) => {
  const endOfMessages = useRef(null);
  const user = localStorage.getItem('user'); 

 
  const scrollToBottom = () => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    
    socket.on("messageDeleted", (messageId) => {
      
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== parseInt(messageId)));
    });

   
    return () => {
      socket.off("messageDeleted");
    };
  }, [socket, setChats]);

  
  const handleDeleteMessage = (messageId) => {
    socket.emit('deleteMessage', messageId); 
  };

  
  const SenderChat = ({ message, username, avatar, id }) => (
    <div className="chat_sender">
      <img src={avatar} alt="Avatar" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
      <button className="delete_button" onClick={() => handleDeleteMessage(id)}>
        <FaTrash /> 
      </button>
    </div>
  );

 
  const ReceiverChat = ({ message, username, avatar, id }) => (
    <div className="chat_receiver">
      <img src={avatar} alt="Avatar" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
      <button className="delete_button" onClick={() => handleDeleteMessage(id)}>
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div className="chats_list">
      {chats.map((chat) =>
        chat.username === user ? (
          <SenderChat key={chat.id} {...chat} />
        ) : (
          <ReceiverChat key={chat.id} {...chat} />
        )
      )}
      <div ref={endOfMessages}></div>
    </div>
  );
};

export default ChatLists;
