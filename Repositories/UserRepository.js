const fs = require('fs-extra');
const User = require('../Models/UserModel.js');

const filePath = './Data/Users.json';

class UserRepository {
    async saveUsers(users) {
        try {
            await fs.writeJson(filePath, users);
        } catch (error) {
            console.error(error);
        }
    }

    async getUsers() {
        try {
            const data = await fs.readJson(filePath);
            
            if (!Array.isArray(data)) {
                throw new Error('Los datos de usuarios no son un array');
            }

            return data.map(user => new User(user.Id, user.Name, user.Password));
        } catch (error) {
            console.error('Error en getUsers:', error.message);
            return []; // Devuelve un array vacío en caso de error
        }
    }
}

module.exports = UserRepository; // Exporta la clase UserRepository
