import express from 'express';
import UserFindController from '../controllers/user-find-controller.js';
import UserVerifyController from '../controllers/user-verify-controller.js';
import UserGetController from '../controllers/user-get-controller.js';
import UserUpdateController from '../controllers/user-update-controller.js';

let router = express.Router();

router.post('/user', UserFindController.find)
router.get('/user/:id', UserGetController.get)
router.post('/user-update/:id', UserUpdateController.update)
router.get('/user-verify/:id', UserVerifyController.verify)

export default router;