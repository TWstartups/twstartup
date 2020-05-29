import express from 'express';
import User from './user/controller';

const router = express.Router();



router.get('/', (req,res) => res.send('Hello world'))
router.post('/signup',User.signup)
router.post('/login', User.login)
router.get('/user/:jwt', User.profile)


export default router;