
import CompanyApi from './company/router'
import CandidateApi from './candidate/router'
import UtilsApi from './utils'

import express from 'express'
const router = express.Router()

router.get('/', (req, res) => res.json({ message: '/api connected' }))

router.use('/candidate', CandidateApi)
router.use('/company', CompanyApi)
router.use('/utils', UtilsApi)

export default router
