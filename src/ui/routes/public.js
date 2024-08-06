import express from 'express';
import UserLoginController from '../controllers/user/user-login-controller.js';
import UserRegisterController from '../controllers/user/user-register-controller.js';
import UserRefreshTokenController from '../controllers/user/user-refresh-token-controller.js';
import UserMailVerifyController from '../controllers/user/user-mail-verify-controller.js';
import UserRecoverPasswordController from '../controllers/user/user-recover-password-controller.js';
import UserUpdatePasswordController from '../controllers/user/user-update-password-controller.js';

let router = express.Router();

router.get('/refresh-token', UserRefreshTokenController.refresh);
router.get('/mail-verify/:token', UserMailVerifyController.verify);
router.post('/recover-password/', UserRecoverPasswordController.recover);
router.post('/update-password/:token', UserUpdatePasswordController.update);

router.post('/register', UserRegisterController.register);
router.post('/login', UserLoginController.login);

export default router;