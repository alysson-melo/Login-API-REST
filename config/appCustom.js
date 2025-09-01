const routes = require("../routes/index")
const dbConnection = require("../infrastructure/dbConnection")
const tables = require("../infrastructure/tables")

module.exports = (app, express) => {
    routes(app, express)
    tables.init(dbConnection)
}