const { Router } = require('express')
const router = Router()
const loginController = require("../controllers/loginController")

router.post("/users", async (req, res) => {
    try {
        const newUser = req.body
        const response = await loginController.createNewUser(newUser)
        res.status(201).json(response)
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

router.put("/user:id", (req, res) => {
    const { id } = req.params
    const response = loginController.update(id)
    res.send(response)
})

router.delete("/user:id", (req, res) => {
    const { id } = req.params
    const response = loginController.delete(id)
    res.send(response)
})

module.exports = router