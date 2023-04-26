import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/user/balance", (request, response) => response.send({balance: 200}))

export default router;