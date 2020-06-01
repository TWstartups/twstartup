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
    const token = req.params.jwt;
    const CandiId = req.params.Cid;
    const user_id = await JWT.verifyToken(token);
    console.log(user_id);
    try {
      const foundCandi = await Candidate.find({_id:CandiId, applicant: user_id});
      console.log(foundCandi);
      if (!foundCandi) {
        res.status(500).json({message: 'There is no applucation under this user.'})
      }
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
  }
}