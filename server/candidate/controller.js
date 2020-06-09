import Candidate from './model';
import JWT from '../user/jwt';
import User from '../user/model'
import Email from './email';

export default {
  create: async (req, res) => {
    console.log(req.body.formValues)
    const data = req.body.formValues;
    const user = req.user;
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
      const createdComp = await Candidate.create({...data,approve_status:false, applicant:user._id});
      const updatedUser = await User.findByIdAndUpdate(user._id,{candidate:createdComp._id})
      console.log(updatedUser);
      res.status(200).json({candidate:createdComp})
    } catch(err){
      res.status(500).json({message: 'something went wrong'})
    }
  },
  show: async ( req,res ) => {
    console.log('hii there')
    console.log(req.params)
    const CandiId = req.params.id;

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
    console.log(req.user)
    console.log('in showall')
    try {
      const allCandidate= await Candidate.find({approve_status:false})
      console.log(allCandidate)
      res.status(200).json({candidates:allCandidate})
    } catch(err) {
      res.status(500).json({message:"something went wrong"})
    }
  },
  edit: async (req, res) => {
    console.log('in edit candidtate')
    const candi_id = req.params.id;
    const CandiData = req.body.formValues
    try {
      const editedCandi = await Candidate.findByIdAndUpdate(candi_id,CandiData )
      res.status(200).json({candidate: editedCandi})
    }catch(err) {
      res.status(500).json({message:"something went wrong"})
    }
    
  },
  approve: async (req,res) => {
    console.log('hii in approve')
    try {
      const foundCandi = await Candidate.findById(req.params.id).populate('applicant');
      const sendToName = foundCandi.applicant.name;
      await Email.send('amazingshellyyy@gmail.com',sendToName)
      res.status(200).json({message:'email is sent'});
    } catch(err){
      console.log(err)
      res.status(500).json({message:'something is wrong sending email'})
    }
    
  }
}