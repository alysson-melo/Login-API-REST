const mysql = require("mysql")

const dbConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "login_node"
})

module.exports = dbConnection