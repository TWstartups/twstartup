import Controller from './controller'
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => res.json({ message: '/api/company connected' }))
router.post('/create', Controller.create)
router.put('/edit/:id', Controller.edit)
router.put('/image', Controller.imgUpload)

export default router
