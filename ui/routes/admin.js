import express from 'express';
import UserFindController from '../controllers/user-find-controller.js';
import UserVerifyController from '../controllers/user-verify-controller.js';
import UserGetController from '../controllers/user-get-controller.js';
import UserUpdateController from '../controllers/user-update-controller.js';
import UserIsAdminController from '../controllers/user-is-admin-controller.js';
import BookFindController from '../controllers/book-find-controller.js';
import BookGetController from '../controllers/book-get-controller.js';
import BookUpdateController from '../controllers/book-update-controller.js';

let router = express.Router();

router.get('/is-admin', UserIsAdminController.isAdmin)

router.post('/user', UserFindController.find)
router.get('/user/:id', UserGetController.get)
router.post('/user-update/:id', UserUpdateController.update)
router.get('/user-verify/:id', UserVerifyController.verify)

router.post('/book', BookFindController.find)
router.get('/book/:isbn', BookGetController.get)
router.post('/book-update/:isbn', BookUpdateController.update)

export default router;