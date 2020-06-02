import Controller from './controller';

import express from 'express';

const router = express.Router();


router.get('/', (req, res)=> res.json({message:"/api/candidate connected"}))
router.post('/create', Controller.create);
router.put('/edit/:id', Controller.edit);
router.post('/appove/:id', Controller.approve);
router.get('/:id', Controller.show);
router.get('/all', Controller.showAll);


export default router;