const dbConnection = require("../infrastructure/dbConnection")
const bcrypt = require("bcrypt")

class LoginModel {

    executeQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, params, (error, results) => {
                if (error) {
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    listAllUsers() {
        const sql = "SELECT * FROM user"
        return this.executeQuery(sql)
    }

    listUser(id) {
        const sql = "SELECT * FROM user WHERE id = ?"
        return this.executeQuery(sql, id)
    }

    async createNewUser(newUser) {
        const requiredFields = ["Nome", "NomeDeUsuario", "DataDeNascimento", "Email", "Senha", "Sexo"]
        const missingFields = requiredFields.filter(field => !newUser[field] || newUser[field].toString().trim() === "")

        if (missingFields.length > 0) {
            throw new Error(`Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`)
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(newUser.Senha, saltRounds)
        newUser.Senha = hashedPassword

        const sql = "INSERT INTO user SET ?"
        return this.executeQuery(sql, newUser)
    }

    async updateUser(updatedUser, id) {
        if (updatedUser.Senha) {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(updatedUser.Senha, saltRounds)
            updatedUser.Senha = hashedPassword
        }

        const sql = "UPDATE user SET ? WHERE id = ?"
        return this.executeQuery(sql, [updatedUser, id])
    }

    deleteUser(id) {
        const sql = "DELETE FROM user WHERE id = ?"
        return this.executeQuery(sql, id)
    }
}

module.exports = new LoginModel()