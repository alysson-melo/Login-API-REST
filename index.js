const express = require("express")
const app = express()
const port = 3000;
const appCustom = require("./config/appCustom")

appCustom(app, express)

app.listen(port, (error) => {
    if (error) {
        console.log("Erro ao subir a aplicação")
        return
    }
    console.log("Aplicação rodando...")
})