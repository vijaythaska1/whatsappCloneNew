import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();
// router.use(validation.validateApiKeys)
router.post("/userSchema", userController.createUser);
export default router;
