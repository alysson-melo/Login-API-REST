const express = require("express")
const app = express()
const port = 3000;
const routes = require("./routes/index")
const dbConnection = require("./infrastructure/dbConnetion")
const tables = require("./infrastructure/tables")

tables.init(dbConnection)

routes(app)

app.listen(port, (error) => {
    if (error) {
        console.log("Erro ao subir a aplicação")
        return
    }
    console.log("Aplicação rodando...")
})