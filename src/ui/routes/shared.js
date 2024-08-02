import express from 'express';
import UserIsVerifiedController from '../controllers/user/user-is-verified-controller.js';
import BookVectorSearchController from '../controllers/book/book-vector-search-controller.js';
let router = express.Router();

router.get('/is-verified', UserIsVerifiedController.isVerified);
router.post('/book-search-similar', BookVectorSearchController.search)

export default router;