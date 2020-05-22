import jwt from 'jsonwebtoken';
import config from '../config';


const JWT = {
  generateToken: async(user) => {
    const token = jwt.sign({ foo: user._id }, `${config.jwt_secret}`,{ expiresIn: "10h" });
    return token
  }
}

export default JWT;