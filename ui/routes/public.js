import express from 'express';
import UserLoginController from '../controllers/user-login.js';
import UserRegisterController from '../controllers/user-register.js';
import UserFindController from '../controllers/user-find.js';

let router = express.Router();

router.post('/register', UserRegisterController.register);
router.post('/login', UserLoginController.login);
router.post('/user', UserFindController.find)

export default router;