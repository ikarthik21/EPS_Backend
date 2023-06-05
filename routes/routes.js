import express from 'express';
import UserController from '../app/controllers/UserController.js';
import CaseController from '../app/controllers/CaseController.js';
import Auth from '../app/middlewares/Auth.js';
import Admin from '../app/middlewares/Admin.js';
const router = express.Router();


router.get('/', (req, res) => {
    res.send("<h1>Welcome to the Backend Server</h1>");
})




router.post('/register', UserController().register);

router.post('/login', UserController().login);



// New Case Route
router.post('/addcase', CaseController().addcase);
router.post('/editcase', CaseController().editcase);


// Get all Records 
router.get('/getrec', CaseController().allrec);


// Admin Routes 

// All users route
router.get('/users',  UserController().getUsers);

//approve User
router.post('/approveuser',  UserController().approveUser);


// router.get('/dummy', Admin, (req, res, next) => {


//      console.log("good success");
//     return res.json({ message: " <h3> Dummy works fine  </h3> " });

// });

export default router;