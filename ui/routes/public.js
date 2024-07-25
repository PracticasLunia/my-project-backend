import express from 'express';
import UserLoginController from '../controllers/user-login-controller.js';
import UserRegisterController from '../controllers/user-register-controller.js';
import RefreshTokenController from '../controllers/refresh-token-controller.js';

let router = express.Router();

router.get('/refresh-token', RefreshTokenController.refresh);

router.post('/register', UserRegisterController.register);
router.post('/login', UserLoginController.login);

export default router;