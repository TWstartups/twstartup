import dotenv from 'dotenv';
import path from 'path'

if (process.env.NODE_ENV != 'production') {
    dotenv.config({ path: path.resolve(__dirname, '.env') });
  }
export default {
  jwt_secret: process.env.JWT_SECRET || 'jwt_secret',
	mongoose: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost/twstartups'
    },
    twilio: {
        sid: process.env.TWILIO_SID,
        token: process.env.TWILIO_TOKEN
    },
    environment: process.env.NODE_ENV || 'development'
}