const User = require('../models/User'); 
const { ObjectId } = require('mongoose').Types;

async function getUserInfo(req) {
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: new ObjectId(userId)});
        const username = user.username;
        return { username };
    } catch (error) {
        throw new Error('Error obteniendo información del usuario: ' + error.message);
    }
}

module.exports = { getUserInfo };
