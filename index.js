require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT;
const appConfig = require("./config/appConfig")

appConfig(app, express)

app.listen(port, (error) => {
    if (error) {
        console.log("Erro ao subir a aplicação")
        return
    }
    console.log("Aplicação rodando...")
})