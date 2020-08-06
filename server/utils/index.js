import express from 'express'
const router = express.Router()

import middleware from '../middlewares'

import multer from 'multer';

const uploader = multer({
  storage: multer.memoryStorage()
})

router.post('/upload-to-s3', uploader.single('twstartup_user_upload'), middleware.imageUpload, (req, res) => res.send({ result: req.image }))

export default router
