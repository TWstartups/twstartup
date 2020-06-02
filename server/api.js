
import CompanyApi from './company/router';
import CandidateApi from './candidate/router';
import NewsApi from './news/router';
import EventApi from './event/router';

import express from 'express';
const router = express.Router();

router.get('/', (req, res)=> res.json({message:"/api connected"}))

router.use('/candidate', CandidateApi)
router.use('/company', CompanyApi)
router.use('/news', NewsApi)
router.use('/event', EventApi)


export default router;