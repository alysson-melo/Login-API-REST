const mysql = require("mysql")

const dbConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "login_node"
})

dbConnection.connect((error) => {
    if (error) {
        console.log("Erro ao conectar no banco de dados...")
        console.log(error.message)
        return
    }
    console.log("Conectado ao banco de dados...")
})

module.exports = dbConnection