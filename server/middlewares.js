import User from "./user/model";
import JWT from './user/jwt'

export default {
  loginRequired: async (req, res, next) => {
    if (!req.headers['authorization']) {
      res.status(403).json({ message:'Please log in!'});
    } else {
      console.log('mdw')
      const token = req.headers.authorization.split(' ')[1];
      if (token == null) {
        res.status(403).json({ message:'Please log in!'});
      }
      console.log('token',token)
      try {
        const user_id = await JWT.verifyToken(token);
        console.log(user_id)
        const foundUser = await User.findById(user_id)
        if (!foundUser) {
          res.status(500).json({message:'Cannot find this user'})
        }
      
        req.user = foundUser;
        
        next()
      } catch (err) {
        res.status(403).json({message:'access forbidden'})
      }
      
    }
    
  },
  adminRequired: async (req, res, next) => {
    console.log('inadmin')
    if (!req.headers['authorization']) {
      res.status(403).json({ message:'Please log in!'});
    }
      const token = req.headers.authorization.split(' ')[1];
      if (token == null) {
        res.status(403).json({ message:'Please log in!'});
      }
      console.log('token',token)
      try {
        const user_id = await JWT.verifyToken(token);
        const foundUser = await User.findById(user_id);
        console.log(foundUser);
        if (foundUser.type === 'super') {
          console.log('yay it is admin')
          req.user = foundUser;
          console.log('after yay')
          next();
        } else {
          
         res.status(403).json({message:'You are not an admin'})
        }
      } catch(err) {
        res.status(500).json({message:'Something went wrong'})
      }
      
    
   
  }
};
