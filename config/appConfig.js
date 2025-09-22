const routes = require("../routes/index")
const dbConnection = require("./dbConnection")
const cors = require('cors')

module.exports = (app, express) => {
    app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    routes(app)

    dbConnection.connect((error) => {
        if (error) {
            console.log("Erro ao conectar no banco de dados...")
            console.log(error.message)
            return
        }
        console.log("Conectado ao banco de dados...")
    })
}