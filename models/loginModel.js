const dbConnection = require("../infrastructure/dbConnetion")

class LoginModel {
    list() {
        const sql = "SELECT * FROM user;"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, (error, response) => {
                if (error) {
                    console.log("Erro no método listar")
                    reject(error)
                    return
                }
                console.log("Método listar executado com sucesso...")
                resolve(response)
            })
        })
    }
}

module.exports = new LoginModel()