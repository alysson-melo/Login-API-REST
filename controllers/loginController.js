class LoginController {
    create() {
        return "Criando usuário..."
    }
    read() {
        return "Buscando usuario..."
    }
    update(id) {
        return `Atualizando usuário número ${id}...`
    }
    delete(id) {
        return `Deletando usuário número ${id}...`
    }
}

module.exports = new LoginController()