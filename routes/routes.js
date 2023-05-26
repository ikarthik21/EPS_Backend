import express from 'express';
import UserController from '../app/controllers/UserController.js';

const router = express.Router();


router.get('/', (req, res) => {
    res.send("<h1>Welcome to the Backend Server</h1>");
})



router.post('/register', UserController().register);
router.post('/login', UserController().login);

export default router;