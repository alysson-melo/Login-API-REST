const routes = require("../routes/index")
const dbConnection = require("../infrastructure/dbConnection")

module.exports = (app, express) => {
    routes(app, express)
    dbConnection.connect
}