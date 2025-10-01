const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/jwtConfig")
const userModel = require("../models/userModel")
const { generateAccessToken, generateRefreshToken } = require("../services/generateTokens")

class AuthController {

    async login(req, res) {
        try {
            const { email, senha } = req.body

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" })
            }

            const users = await userModel.findUserByEmail(email)
            if (users.length === 0 || !users) return res.status(401).json({ error: "Email ou senha inválidos" })

            const user = users[0]
            const validPassword = await bcrypt.compare(senha, user.senha)
            if (!validPassword) return res.status(401).json({ error: "Email ou senha inválidos" })

            const accessToken = generateAccessToken(user)
            const refreshToken = generateRefreshToken(user)
            const { senha: trash, ...userWithoutPassword } = user

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false, // mudar para true em produção HTTPS
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
            })

            res.json({ accessToken, userWithoutPassword })
        }
        catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async refresh(req, res) {
        try {
            const token = req.cookies.refreshToken
            if (!token) return res.status(401).json({ error: "Refresh token não fornecido" })

            jwt.verify(token, jwtSecret, (error, user) => {
                if (error) {
                    if (error.name === "TokenExpiredError") {
                        return res.status(401).json({ error: "Refresh token expirado" })
                    }
                    return res.status(403).json({ error: "Refresh token inválido" })
                }
                const accessToken = generateAccessToken(user)
                res.json({ accessToken: accessToken })
            })
        }
        catch (error) {
            res.status(500).json({ error: "Erro interno do servidor" })
        }
    }

    async logout(req, res) {
        res.clearCookie("refreshToken")
        res.json({ message: "Logout realizado com sucesso" })
    }
}

module.exports = new AuthController()