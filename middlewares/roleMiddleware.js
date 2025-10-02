module.exports = (roles) => {

    return (req, res, next) => {

        if (typeof roles === "string") roles = [roles]

        if (req.user.role === "user" && req.params.id) {
            if (parseInt(req.params.id) !== req.user.id) {
                return res.status(403).json({ error: "Acesso negado" })
            }
        }

        if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Permissão insuficiente" })

        next()
    }
}