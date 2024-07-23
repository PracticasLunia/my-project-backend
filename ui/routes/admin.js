import express from 'express';
import UserFindController from '../controllers/user-find-controller.js';

let router = express.Router();

router.post('/user', UserFindController.find)

export default router;