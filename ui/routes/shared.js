import express from 'express';
import UserIsVerifiedController from '../controllers/user-is-verified-controller.js';
let router = express.Router();

router.get('/is-verified', UserIsVerifiedController.isVerified)

export default router;