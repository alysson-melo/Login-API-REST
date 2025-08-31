const loginModel = require("../models/loginModel")

class LoginController {
    create() {
        return "Criando usuário..."
    }
    read() {
        return loginModel.list()
    }
    update(id) {
        return `Atualizando usuário número ${id}...`
    }
    delete(id) {
        return `Deletando usuário número ${id}...`
    }
}

module.exports = new LoginController()