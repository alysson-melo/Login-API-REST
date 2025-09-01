const loginModel = require("../models/loginModel")

class LoginController {

    async createNewUser(req, res) {
        try {
            const newUser = req.body
            const results = await loginModel.createNewUser(newUser)
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                userId: results.insertId,
                affectedRows: results.affectedRows
            })
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async listAllUsers(req, res) {
        try {
            const listUsers = await loginModel.listAllUsers()
            res.status(200).json(listUsers)
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async listUser(req, res) {
        try {
            const { id } = req.params
            const results = await loginModel.listUser(id)
            res.status(200).json(results)
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params
            const updatedUser = req.body
            const results = await loginModel.updateUser(updatedUser, id)
            res.status(200).json({
                message: results.changedRows > 0 ? "Usuário atualizado com sucesso!" : "Nenhuma alteração feita",
                affectedRows: results.affectedRows,
                changedRows: results.changedRows
            })
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params
            const results = await loginModel.deleteUser(id)
            res.status(200).json({
                message: results.affectedRows > 0 ? "Usuário deletado com sucesso!" : "Usuário não encontrado",
                affectedRows: results.affectedRows
            })
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }
}

module.exports = new LoginController()