const User = require("../Models/UserModel");

class UserService {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }

    ObtenerUser() {
        return this.UserRepository.ObtenerUser();
    }
}

module.exports = UserService;
