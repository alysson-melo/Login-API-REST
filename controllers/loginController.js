const loginModel = require("../models/loginModel")

class LoginController {
    createNewUser(newUser) {
        return loginModel.createNewUser(newUser)
    }
    listAllUsers() {
        return loginModel.listAllUsers()
    }
    update(id) {
        return `Atualizando usuário número ${id}...`
    }
    delete(id) {
        return `Deletando usuário número ${id}...`
    }
}

module.exports = new LoginController()