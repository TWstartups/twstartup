import Candidate from './model';
import JWT from '../user/jwt';
import User from '../user/model'

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
      const updatedUser = await User.findByIdAndUpdate(data.applicant,{candidate:createdComp._id})
      console.log(updatedUser);
      res.status(200).json({candidate:createdComp})
    } catch(err){
      res.status(500).json({message: 'something went wrong'})
    }
  },
  show: async ( req,res ) => {
    console.log('hii there')
    
    const CandiId = req.params.cId;
    
    console.log(CandiId)
    
    try {
      const foundCandi = await Candidate.findById(CandiId)
      console.log(foundCandi);
      if (!foundCandi) {
        res.status(500).json({message: 'There is no application under this user.'})
      }
      
      console.log('yesss')
      res.status(200).json({candidate:foundCandi})

    } catch {
      res.status(500).json({message:'Something went wrong.'})
    }
  },
  showAll: async (req, res) => {
    console.log('hii')
    const token = req.params.jwt;
    const user_id = await JWT.verifyToken(token);
    const foundUser = await User.findById(user_id);
    if (foundUser.type === 'normal') {
     res.status(500).json({message:'You are not an admin'})
    }
    
    try {
      const allCandidate= await Candidate.find({approve_status:false})
      res.status(200).json({candidates:allCandidate})
    } catch(err) {
      res.status(500).json({message:"something went wrong"})
    }
  },
  edit: async (req, res) => {
    console.log('in edit candidtate')
    const token = req.params.jwt;
    const user_id = await JWT.verifyToken(token);
    const candi_id = req.params.cId;
    res.status(200);
  },
  show:async(req, res) => {
    res.status(200);
  },
  showAll: async(req, res) => {
    res.status(200);
  },
  approve: async (req,res) => {
    res.status(200);
  }
}