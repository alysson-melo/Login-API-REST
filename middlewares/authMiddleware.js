const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../config/jwtConfig")

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(" ")[1]

    if (!token) return res.status(401).json({ error: "Token não fornecido" })

    jwt.verify(token, jwtSecret, (error, user) => {
        if (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token expirado" })
            }
            return res.status(403).json({ error: "Token inválido" })
        }
        req.user = user
        next()
    })
}