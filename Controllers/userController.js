const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get("/user", verifyToken, async (req, res) => {
    try {
        const user = await ObtenerUser.ObtenerUser();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
