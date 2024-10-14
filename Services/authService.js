const userRepository = require('../Repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = '123';

async function register(Name, Password) {
    const users = await userRepository.getUsers();
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = { Id: users.length + 1, Name, Password: hashedPassword };
    users.push(newUser);
    await userRepository.saveUsers(users);

    return newUser;
}

async function login(Name, Password) {
    const users = await userRepository.getUsers();
    const user = users.find(u => u.Name === Name);

    if (!user || !(await bcrypt.compare(Password, user.Password))) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ Id: users.Id, Name: users.Name }, secretKey, { expiresIn: '1h' });
    return token;
}


module.exports = {
    register,
    login
};
