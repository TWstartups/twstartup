import express from 'express'
import User from './user/controller'
import Company from './company/controller'
import Candidate from './candidate/controller'
import Api from './api'
import middleware from './middlewares'

const router = express.Router()
router.get('/', (req, res) => res.send('Hello world'))
router.post('/signup', User.signup)
router.post('/login', User.login)
router.get('/profile', middleware.loginRequired, User.profile)
router.get('/company/all', Company.showAll)
router.get('/company/:id', Company.show)
router.get('/api/candidate/all', middleware.adminRequired, Candidate.showAll)
router.use('/api', middleware.loginRequired, Api)

export default router
