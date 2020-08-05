import Controller from './controller'
import multer from 'multer'
import express from 'express'
import MDW from '../middlewares'

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage()
})

router.get('/', (req, res) => res.json({ message: '/api/company connected' }))
router.post('/create', Controller.create)
router.put('/edit/:id', Controller.edit)
router.post('/image', upload.single('company_images'), MDW.imageUpload, Controller.imgUpload)

export default router
