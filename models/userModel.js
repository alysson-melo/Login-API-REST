const dbConnection = require("../config/dbConnection")

class UserModel {

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

    createNewUser(newUser) {
        return this.executeQuery("INSERT INTO user SET ?", newUser)
    }

    findUserByEmail(email) {
        return this.executeQuery("SELECT * FROM user WHERE email = ?", email)
    }

    listAllUsers() {
        return this.executeQuery("SELECT * FROM user")
    }

    findUserById(id) {
        return this.executeQuery("SELECT * FROM user WHERE id = ?", id)
    }

    updateUser(updatedUser, id) {
        return this.executeQuery("UPDATE user SET ? WHERE id = ?", [updatedUser, id])
    }

    deleteUser(id) {
        return this.executeQuery("DELETE FROM user WHERE id = ?", id)
    }
}

module.exports = new UserModel()