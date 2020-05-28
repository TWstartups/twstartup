import bcrypt from 'bcrypt';
import User from './model';
import jwt from 'jsonwebtoken';
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
            message: "Email is already been registered, please try again",
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
    
      res.status(200).json({ token, user: createdUser.email });
    }catch {
      return res.status(200).json({ error: err });
    }
      
  },
  login: async (req, res) => {
    const userData = req.body.formValues;
    console.log(userData);
    if (!userData.email || !userData.password) {
      return res.status(400).json({
        status: 400,
        errors: [{ message: "Please enter your email and password" }],
      });
    }
    try {
      const foundUser = await User.findOne({ email: userData.email });
      if (!foundUser) {
        return res.status(400).json({status: 400,errors: [{ message: "Username or password is incorrect" }],});
      }
      const isMatch = bcrypt.compare(userData.password, foundUser.password);
      if (isMatch) {
        try {
          const token = await JWT.generateToken(foundUser);
          return res.status(200).json({ token, user: foundUser.email });
        }catch {
          return res.status(500).json({
            status: 503,
            errors: [{ message: "access forbidden" }],
          });
        }
      } else {
        return res.json({
          status: 400,
          errors: [{ message: "Username or password is incorrect" }],
        });
      }
      
    
    }catch {
      return res.status(500).json({status: 500,errors: [{ message: "Something went wrong. Please try again" }],});
    }
      
    
  },
};
