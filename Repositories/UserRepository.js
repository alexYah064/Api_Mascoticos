const fs = require('fs-extra');
const User = require('../Models/UserModel.js');

const filePath = './Data/Users.json';

async function saveUsers(users) {
    try {
        await fs.writeJson(filePath, users);
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    try {
        const data = await fs.readJson(filePath);
        return data.map(user => new User(user.id, user.name, user.password));
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    saveUsers,
    getUsers
};
