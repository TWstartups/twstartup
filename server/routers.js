import express from 'express';
import User from './user/controller';
const router = express.Router();
import Company from './company/controller';
import Api from './api';

router.get('/', (req,res) => res.send('Hello world'))
router.post('/signup',User.signup)
router.post('/login', User.login)

router.get('/user/:jwt', User.profile)
router.get('/company/all', Company.showAll);
router.use('/api',Api);


export default router;