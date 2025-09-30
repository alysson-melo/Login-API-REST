module.exports = {
    jwtSecret: process.env.jwtSecret,
    accessTokenExpiresIn: "15m",
    refreshTokenExpiresIn: "7d"
}