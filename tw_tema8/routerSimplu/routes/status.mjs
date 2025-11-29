import express from 'express'

const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(200).json({message: "Server is running..."})
});

export default router;