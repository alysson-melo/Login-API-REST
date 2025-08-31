const dbConnection = require("../infrastructure/dbConnetion")

class LoginModel {
    listAllUsers() {
        const sql = "SELECT * FROM user"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, (error, response) => {
                if (error) {
                    console.log("Erro no método list")
                    reject(error)
                    return
                }
                console.log("Método listar executado com sucesso...")
                resolve(response)
            })
        })
    }

    createNewUser(newUser) {
        const sql = "INSERT INTO user SET ?"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, newUser, (error, response) => {
                if (error) {
                    console.log("Erro no método createNewUser")
                    reject(error)
                    return
                }
                console.log("Novo usuário criado com sucesso...")
                resolve(response)
            })
        })
    }
}

module.exports = new LoginModel()