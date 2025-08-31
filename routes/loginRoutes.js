const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.post("/users", async (req, res) => {
    try {
        const newUser = req.body
        const results = await loginController.createNewUser(newUser)
        res.status(201).json(results)
    }
    catch (error) {
        res.status(400).json({ error: error.message || error })
    }
})

router.get("/users", async (req, res) => {
    try {
        const listUsers = await loginController.listAllUsers()
        res.status(200).json(listUsers)
    }
    catch (error) {
        res.status(400).json({ error: error.message || error })
    }
})

router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updatedUser = req.body
        const results = await loginController.updateUser(updatedUser, id)
        res.status(200).json(results)
    }
    catch (error) {
        res.status(400).json({ error: error.message || error })
    }
})

// QUAL DIFERENÇA DE USAR PARMS E QUERY?
// VERIFICAR SE OS STATUS CODES ESTÃO CORRETOS
// PARA QUE SERVE O VERBO PATH

router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const results = await loginController.deleteUser(id)
        res.status(200).json(results)
    }
    catch (error) {
        res.status(400).json({ error: error.message || error })
    }
})

module.exports = router