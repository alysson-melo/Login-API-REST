const jwt = require("jsonwebtoken")
const { jwtSecret, accessTokenExpiresIn, refreshTokenExpiresIn } = require("../config/jwtConfig")

exports.generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: accessTokenExpiresIn })
}

exports.generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: refreshTokenExpiresIn })
}