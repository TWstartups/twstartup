import Controller from './controller';
import MDW from '../middlewares';
import express from 'express';

const router = express.Router();


router.get('/', (req, res)=> res.json({message:"/api/candidate connected"}))
router.post('/create', Controller.create);
router.put('/edit/:id', Controller.edit);
router.post('/approve', Controller.approve);
router.get('/:id', Controller.show);




export default router;