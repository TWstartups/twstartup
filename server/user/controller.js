import bcrypt from 'bcrypt';
import User from './model';
import jwt from 'jsonwebtoken';
require("dotenv").config();
import JWT from './jwt';



export default {
  signup: async (req, res) => {
    const userData = req.body;
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
    console.log(salt);
    const hash = await bcrypt.hash(userData.password, salt);
    console.log(hash);
    
    const { email } = userData;
    const newUser = {
      email: email,
      password:hash
    };
    console.log(newUser)
    
      const createdUser = await User.create(newUser);
      console.log(createdUser);
      
    try {
      const token = await JWT.generateToken(createdUser);
      res.status(200).json({ token, userId: createdUser._id });
    }catch {
      return res.status(200).json({ error: err });
    }
      
  },
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        errors: [{ message: "Please enter your email and password" }],
      });
    }
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        return res.status(400).json({status: 400,errors: [{ message: "Username or password is incorrect" }],});
      }
      bcrypt.compare(req.body.password, foundUser.password, async(err, isMatch) => {
        if (err)
          return res.status(500).json({
            status: 500,
            errors: [{ message: "Something went wrong. Please try again" }],
          });
        if (isMatch) {
          try {
            const token = await jwt.sign({ foo: foundUser._id },`${process.env.JWT_SECRET}`,{ expiresIn: "10h" });
            return res.status(200).json({ token, userId: foundUser._id });
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
      });
    }catch {
      return res.status(500).json({status: 500,errors: [{ message: "Something went wrong. Please try again" }],});
    }
      
    
  },
};
