const dbConnection = require("../infrastructure/dbConnetion")

class LoginModel {
    listAllUsers() {
        const sql = "SELECT * FROM user"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, (error, results) => {
                if (error) {
                    console.log("Erro no método list")
                    reject(error)
                    return
                }
                console.log("Método listar executado com sucesso...")
                resolve(results)
            })
        })
    }

    createNewUser(newUser) {
        const requiredFields = ["Nome", "NomeDeUsuario", "DataDeNascimento", "Email", "Senha"]
        const missingFields = requiredFields.filter(field => !newUser[field] || newUser[field].toString().trim() === "")
        const sql = "INSERT INTO user SET ?"

        return new Promise((resolve, reject) => {
            if (missingFields.length > 0) {
                console.log("Erro no método createNewUser")
                return reject(new Error(`Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`))
            }

            dbConnection.query(sql, newUser, (error, results) => {
                if (error) {
                    console.log("Erro no método createNewUser")
                    reject(error)
                    return
                }
                console.log("Novo usuário criado com sucesso...")
                resolve(results)
            })
        })
    }

    updateUser(updatedUser, id) {
        const sql = "UPDATE user SET ? WHERE id = ?"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, [updatedUser, id], (error, results) => {
                if (error) {
                    console.log("Erro no método updateUser")
                    reject(error)
                    return
                }
                console.log("Usuário atualizado com sucesso...")
                resolve(results)
            })
        })
    }

    deleteUser(id) {
        const sql = "DELETE FROM user WHERE id = ?"
        return new Promise((resolve, reject) => {
            dbConnection.query(sql, [id], (error, results) => {
                if (error) {
                    console.log("Erro no método deleteUser")
                    reject(error)
                    return
                }
                console.log("Usuário deletado com sucesso...")
                resolve(results)
            })
        })
    }
}

module.exports = new LoginModel()