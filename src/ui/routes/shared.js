import express from 'express';
import UserIsVerifiedController from '../controllers/user/user-is-verified-controller.js';
import BookVectorSearchController from '../controllers/book/book-vector-search-controller.js';
import BookVectorPreferencesController from '../controllers/book/book-vector-preferences-controller.js';
import BookDownloadController from '../controllers/book/book-download-controller.js';
let router = express.Router();

router.get('/is-verified', UserIsVerifiedController.isVerified);
router.get('/book-download/:isbn', BookDownloadController.download);
router.post('/book-search-similar', BookVectorSearchController.search);
router.get('/book-search-preferences', BookVectorPreferencesController.preferences);

export default router;