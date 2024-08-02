import express from 'express';
import UserLoginController from '../controllers/user/user-login-controller.js';
import UserRegisterController from '../controllers/user/user-register-controller.js';
import RefreshTokenController from '../controllers/refresh-token-controller.js';
import MailVerifyController from '../controllers/mail-verify-controller.js';

let router = express.Router();

router.get('/refresh-token', RefreshTokenController.refresh);
router.get('/mail-verify/:token', MailVerifyController.verify);

router.post('/register', UserRegisterController.register);
router.post('/login', UserLoginController.login);

export default router;