const userRoutes = require("./userRoutes")
const authRoutes = require("./authRoutes")

module.exports = (app) => {
    app.use(userRoutes)
    app.use(authRoutes)
}