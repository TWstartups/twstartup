import Controller from './controller';
import express from 'express';

const router = express.Router();

router.get('/', (req, res)=> res.json({message:"/api/news connected"}))
router.post('/create', Controller.create);
router.put('/edit/:cId/:id', Controller.edit);
router.get('/all/:cId', Controller.showAll);
router.delete('/delete/:cId/:id', Controller.destroy);


export default router;

