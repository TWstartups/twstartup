import bcrypt from 'bcrypt';
import User from './model';
require("dotenv").config();
import JWT from './jwt';



export default {
  signup: async (req, res) => {
    const userData = req.body.formValues;
    console.log(userData);
    /* Validating Sign up Form */
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: "All fileds are required" });
    }
    //check for existing user account
    try {
      const foundUser = await User.findOne({ email: userData.email });
      
      if (foundUser) {
        return res
          .status(400)
          .json({
            message: "Email has already been registered, please try again.",
          });
      }
    } catch {
      
      return res.status(400).json({ message: "Bad request, try again" });
    }
    
    //generate hash Salt
    const salt = await bcrypt.genSalt(10);
   
    const hash = await bcrypt.hash(userData.password, salt);
    
    
    const { email } = userData;
    const newUser = {
      email: email,
      password:hash
    };
    
    const createdUser = await User.create(newUser);
    
      
    try {
    
      const token = await JWT.generateToken(createdUser);
      const {_id,email} = createdUser;
      const userToSend = {
        _id,
        email
      }
      res.status(200).json({ token, user: userToSend });
    }catch(err) {
      return res.status(400).json({ message: 'Somthing went wrong, try again later.' });
    }
      
  },
  login: async (req, res) => {
    const userData = req.body.formValues;
    console.log(userData);
    if (!userData.email || !userData.password) {
      return res.status(400).json({ message: "Please enter your email and password"});
    }
    try {
      const foundUser = await User.findOne({ email: userData.email });
      if (!foundUser) {
        return res.status(400).json({ message: "Username or password is incorrect" });
      }
      const isMatch = await bcrypt.compare(userData.password, foundUser.password);
      console.log('0',isMatch);
      if (isMatch) {
        console.log('1',isMatch);
        try {
          const token = await JWT.generateToken(foundUser);
          const { _id, email } = foundUser;
          const userToSend = {
            _id,
            email
          }
          return res.status(200).json({ token, user: userToSend });
        }catch {
          return res.status(500).json({ message: "access forbidden" });
        }
      } else {
        console.log('2',isMatch);
        return res.status(400).json({message: "Username or password is incorrect"});
      }
    }catch(err) {
      return res.status(500).json({message: "Something went wrong. Please try again" });
    }
  },
  profile: async (req, res) => {
    try {
      const token = req.params.jwt;
      const decoded = await JWT.verifyToken(token);
      const foundUser = await User.findById(decoded.foo)
      const {_id,email} = foundUser;
      const userToSend = {
        _id,
        email
      }
      console.log(token);
      res.status(200).json({message: 'success', user:userToSend})
    } catch(err) {
      console.log(err)
      res.status(500).json({message:err})
    }
  }
};
