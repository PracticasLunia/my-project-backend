import express from 'express';
import UserFindController from '../controllers/user/user-find-controller.js';
import UserVerifyController from '../controllers/user/user-verify-controller.js';
import UserGetController from '../controllers/user/user-get-controller.js';
import UserUpdateController from '../controllers/user/user-update-controller.js';
import UserIsAdminController from '../controllers/user/user-is-admin-controller.js';
import BookFindController from '../controllers/book/book-find-controller.js';
import BookGetController from '../controllers/book/book-get-controller.js';
import BookUpdateController from '../controllers/book/book-update-controller.js';
import BookCreateController from '../controllers/book/book-create-controller.js';
import BookDeleteController from '../controllers/book/book-delete-controller.js';
import CategoryGetAllController from '../controllers/category/category-getAll-controller.js';
import CategoryGetController from '../controllers/category/category-get-controller.js';
import CategoryCreateController from '../controllers/category/category-create-controller.js';
import CategoryDeleteController from '../controllers/category/category-delete-controller.js';
import CategoryUpdateController from '../controllers/category/category-update-controller.js';
import TagGetAllController from '../controllers/tag/tag-getAll-controller.js';
import TagGetController from '../controllers/tag/tag-get-controller.js';
import TagCreateController from '../controllers/tag/tag-create-controller.js';
import TagDeleteController from '../controllers/tag/tag-delete-controller.js';
import TagUpdateController from '../controllers/tag/tag-update-controller.js';
import BookImportController from '../controllers/book/book-import-controller.js';
import BookCoverController from '../controllers/book/book-cover-controller.js';

let router = express.Router();

router.get('/is-admin', UserIsAdminController.isAdmin)

router.post('/user', UserFindController.find)
router.get('/user/:id', UserGetController.get)
router.post('/user-update/:id', UserUpdateController.update)
router.get('/user-verify/:id', UserVerifyController.verify)

router.post('/book', BookFindController.find)
router.get('/book/:isbn', BookGetController.get)
router.post('/book-create', BookCreateController.create)
router.post('/book-import', BookImportController.import)
router.delete('/book-delete/:isbn', BookDeleteController.delete)
router.post('/book-update/:isbn', BookUpdateController.update)
router.get('/book-cover/:isbn', BookCoverController.cover)

router.get('/categories', CategoryGetAllController.getAll)
router.get('/category/:id', CategoryGetController.get)
router.post('/category-create', CategoryCreateController.create)
router.delete('/category-delete/:id', CategoryDeleteController.delete)
router.post('/category-update/:id', CategoryUpdateController.update)

router.get('/tags', TagGetAllController.getAll)
router.get('/tag/:id', TagGetController.get)
router.post('/tag-create', TagCreateController.create)
router.delete('/tag-delete/:id', TagDeleteController.delete)
router.post('/tag-update/:id', TagUpdateController.update)

export default router;