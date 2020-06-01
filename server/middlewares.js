import User from "./user/model";
import JWT from './user/jwt'

export default {
  adminRequired: async (req, res, next) => {
    const token = req.params.jwt;
    const decoded = await JWT.verifyToken(token);
    const foundUser = await User.findById(decoded.foo);
    if (foundUser.type === 'super') {
      next();
    } else {
     res.status(500).json({message:'You are not an admin'})
    }
  },
};
