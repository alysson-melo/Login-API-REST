const routesLogin = require("./loginRoutes")

module.exports = (app) => {
    app.use(routesLogin)
}