import Controller from './controller'
import multer from 'multer'
import express from 'express'
import middleware from '../middlewares'

const router = express.Router()

const uploader = multer({
  storage: multer.memoryStorage()
})


router.get('/', (req, res) => res.json({ message: '/api/company connected' }))
router.post('/create', Controller.create)
router.put('/addEvent/:id', Controller.addEvent)
router.delete('/deleteEvent/:compId/:eventId', Controller.deleteEvent)
router.put('/edit/:id', Controller.edit)
router.post('/image', uploader.single('company_image_update'), middleware.imageUpload, Controller.imgUpload)

export default router
