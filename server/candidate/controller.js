import Candidate from './model';

export default {
  create: async (req, res) => {
    console.log(req.body.formValues)
    const data = req.body.formValues;
    try {
      const foundCandi = await Candidate.findOne({website: data.website})
      console.log('foundCandi',foundCandi);
      if (foundCandi) {
        res.status(500).json({message: 'This company already exists. Please contact the customer service for more detail.'})
      }
    } catch(err) {
      res.status(500).json({message: 'Something went wrong'})
    }
    
    try{
      const createdComp = await Candidate.create({...data,approve_status:false});
      res.status(200).json({candidate:createdComp})
    } catch(err){
      res.status(500).json({message: 'something went wrong'})
    }
  },
  showAll: async (req, res) => {
    
    try {
      const allCandidate= await Candidate.find({approve_status:false})
      res.status(200).json({candidates:allCandidate})
    } catch(err) {
      res.status(500).json({message:"something went wrong"})
    }
  }
}