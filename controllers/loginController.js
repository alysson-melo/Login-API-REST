const loginModel = require("../models/loginModel")

class LoginController {
    createNewUser(newUser) {
        return loginModel.createNewUser(newUser)
    }
    listAllUsers() {
        return loginModel.listAllUsers()
    }
    updateUser(updatedUser, id) {
        return loginModel.updateUser(updatedUser, id)
    }
    deleteUser(id) {
        return loginModel.deleteUser(id)
    }
}

module.exports = new LoginController()