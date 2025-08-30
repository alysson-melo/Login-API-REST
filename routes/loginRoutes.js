const { Router } = require('express')
const router = Router()

router.get("/users", (req, res) => {
    res.send("Estamos listando todos os usuários...")
})

router.post("/users", (req, res) => {
    res.send("Estamos criando seu usuário...")
})

router.put("/user:id", (req, res) => {
    const { id } = req.params
    res.send(`Estamos atualizando o usuário ${id}...`)
})

router.delete("/user:id", (req, res) => {
    const { id } = req.params
    res.send(`Estamos deletando o usuário ${id}...`)
})

module.exports = router