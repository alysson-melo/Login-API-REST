const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const validations = require("../services/validations")

class UserController {

    async createNewUser(req, res) {
        try {
            const newUser = req.body

            const requiredFields = ["nomeCompleto", "nomeDeUsuario", "dataDeNascimento", "email", "senha"]
            const missingFields = requiredFields.filter(field => !newUser[field] || newUser[field].toString().trim() === "")

            if (missingFields.length > 0) {
                return res.status(400).json({ error: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}` })
            }

            const validationErrors = validations.validateUser(newUser)
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });

            const IsExistingEmail = await userModel.findUserByEmail(newUser.email)
            if (IsExistingEmail.length > 0) return res.status(409).json({ error: "Este email já está em uso" })

            if (newUser.role) {
                const allowedRoles = ["admin", "user"]
                if (!allowedRoles.includes(newUser.role)) {
                    return res.status(400).json({ error: "Role inválida. Use apenas 'admin' ou 'user'" })
                }
            }

            const saltRounds = 10
            newUser.senha = await bcrypt.hash(newUser.senha, saltRounds)

            const results = await userModel.createNewUser(newUser)

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
            const users = await userModel.listAllUsers()
            res.status(200).json(users)
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async findUserById(req, res) {
        try {
            const { id } = req.params

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" })
            }

            const user = await userModel.findUserById(id)

            if (user.length === 0) return res.status(404).json({ error: "Usuário não encontrado" })

            res.status(200).json(user[0])
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" })
            }

            const updatedUser = req.body

            const existingUser = await userModel.findUserById(id)
            if (existingUser.length === 0) return res.status(404).json({ error: "Usuário não encontrado" })

            const validationErrors = validations.validateUser(updatedUser)
            if (validationErrors.length > 0) return res.status(400).json({ errors: validationErrors });

            const saltRounds = 10
            if (updatedUser.senha) updatedUser.senha = await bcrypt.hash(updatedUser.senha, saltRounds)

            if (updatedUser.role && req.user.role !== "admin") {
                return res.status(403).json({ error: "Somente administradores podem alterar as permissões" })
            }

            const results = await userModel.updateUser(updatedUser, id)

            if (results.changedRows === 0) {
                return res.status(304).json({
                    message: "Nenhuma alteração feita",
                    changedRows: 0
                })
            }

            res.status(200).json({
                message: "Usuário atualizado com sucesso!",
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

            if (!id || isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" })
            }

            const results = await userModel.deleteUser(id)
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: "Usuário não encontrado" })
            }

            res.status(200).json({
                message: "Usuário deletado com sucesso!",
                affectedRows: results.affectedRows
            })
        }
        catch (error) {
            res.status(400).json({ error: error.message || error })
        }
    }
}

module.exports = new UserController()