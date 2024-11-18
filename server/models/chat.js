// const mongoose = require('mongoose')

// const chatSchema = new mongoose.Schema({
//     username: String,
//     message: String,
//     avatar: String,
//     timestamp: {type: Date, default: Date.now}
// })

// const Chat = mongoose.model('message', chatSchema)
// module.exports = Chat

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createChat(username, message, avatar) {
    return await prisma.chat.create({
        data: {
            username,
            message,
            avatar,
        },
    });
}

async function getAllChats() {
    return await prisma.chat.findMany({
        orderBy: {
            timestamp: 'desc',
        },
    });
}

module.exports = { createChat, getAllChats };
