const dbConnection = require("../config/dbConnection")
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
        const requiredFields = ["Nome", "NomeDeUsuario", "DataDeNascimento", "Email", "Senha"]
        const missingFields = requiredFields.filter(field => !newUser[field] || newUser[field].toString().trim() === "")

        if (missingFields.length > 0) {
            throw new Error(`Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`)
        }

        const sqlFindUser = "SELECT * FROM user WHERE email = ?"
        const findUser = await this.executeQuery(sqlFindUser, newUser.Email)

        if (findUser.length === 0) {
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(newUser.Senha, saltRounds)
            newUser.Senha = hashedPassword

            const sql = "INSERT INTO user SET ?"
            return this.executeQuery(sql, newUser)
        }

        throw new Error("Este email já está em uso")
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

    async loginUser(email, senha) {
        const sql = "SELECT * FROM user WHERE email = ?"
        const users = await this.executeQuery(sql, email)

        if (users.length === 0) {
            throw new Error("Email ou senha inválidos")
        }

        const user = users[0]
        const validPassword = await bcrypt.compare(senha, user.Senha)

        if (!validPassword) {
            throw new Error("Email ou senha inválidos")
        }

        return { message: "Login realizado com sucesso!", user }
    }
}

module.exports = new LoginModel()