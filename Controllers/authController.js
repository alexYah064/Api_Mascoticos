const express = require('express');
const { check, validationResult } = require('express-validator');
const authService = require('../Services/authService');

const router = express.Router();

router.post('/register', [
    check('username').not().isEmpty().withMessage('El nombre de usuario es requerido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;
        const newUser = await authService.register(username, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
        }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
