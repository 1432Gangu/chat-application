const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Server } = require("socket.io");
const http = require("http");

const prisma = new PrismaClient();
const app = express();


app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


app.get("/chats", async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: { timestamp: "asc" },
    });
    res.json(chats);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});


app.delete("/chats/:id", async (req, res) => {
  const { id } = req.params;
  try {
   
    const messageExists = await prisma.chat.findUnique({
      where: { id: parseInt(id) },
    });

    if (!messageExists) {
      return res.status(404).json({ error: "Message not found" });
    }

    const deletedMessage = await prisma.chat.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedMessage);
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});


io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  
  const sendChats = async () => {
    try {
      const chats = await prisma.chat.findMany({
        orderBy: { timestamp: "asc" },
      });
      socket.emit("chat", chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  sendChats();


  socket.on("newMessage", async (msg) => {
    try {
      const newChat = await prisma.chat.create({
        data: {
          username: msg.username,
          message: msg.message,
          avatar: msg.avatar,
          timestamp: new Date(),
        },
      });
      io.emit("message", newChat);
    } catch (error) {
      console.error("Error saving message:", error);
      socket.emit("error", "Failed to save the message");
    }
  });

 
  socket.on("deleteMessage", async (messageId) => {
    try {
      
      const messageExists = await prisma.chat.findUnique({
        where: { id: parseInt(messageId) },
      });
  
      if (!messageExists) {
        socket.emit("error", "Message not found");
        return;
      }
  
      
      await prisma.chat.delete({
        where: { id: parseInt(messageId) },
      });
  
      io.emit("messageDeleted", messageId); 
    } catch (error) {
      console.error("Error deleting message:", error);
      socket.emit("error", "Failed to delete the message");
    }
  });
  

 
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


server.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
