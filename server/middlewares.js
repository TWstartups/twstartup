import User from "./user/model";
import JWT from "./user/jwt";
import uuid from './uuid';
import config from './config'
import AWS from 'aws-sdk';

export default {
  loginRequired: async (req, res, next) => {
    if (!req.headers["authorization"]) {
      res.status(403).json({ message: "Please log in!" });
    } else {
      console.log("mdw");
      const token = req.headers.authorization.split(" ")[1];
      if (token == null) {
        res.status(403).json({ message: "Please log in!" });
      }
      console.log("token", token);
      try {
        const user_id = await JWT.verifyToken(token);
        console.log(user_id);
        const foundUser = await User.findById(user_id);
        if (!foundUser) {
          res.status(500).json({ message: "Cannot find this user" });
        }

        req.user = foundUser;

        next();
      } catch (err) {
        res.status(403).json({ message: "access forbidden" });
      }
    }
  },
  adminRequired: async (req, res, next) => {
    console.log("inadmin");
    if (!req.headers["authorization"]) {
      res.status(403).json({ message: "Please log in!" });
    }
    console.log('authorization',req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    if (token == null) {
      res.status(403).json({ message: "Please log in!" });
    }
    console.log("token", token);
    try {
      const user_id = await JWT.verifyToken(token);
      const foundUser = await User.findById(user_id);
      console.log(foundUser);
      if (foundUser.type === "super") {
        console.log("yay it is admin");
        req.user = foundUser;
        console.log("after yay");
        next();
      } else {
        res.status(403).json({ message: "You are not an admin" });
      }
    } catch (err) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  imageUpload: (req, res, next) => {

    const S3_REGION = 'us-east-1';
    const S3_ROOT_BUCKET = 'twstartup';
    const file = req.file;
    const {companyId, type} = req.body;
    if(!file) return res.status(500).json({message:'image bad'});
    if(!type) return res.status(500).json({message:'Uploading Photo Failed: type is not validate.'})
    let filenameParts = file.originalname.split('.');
    let ext;
    if (filenameParts.length > 1) {
      ext = "." + filenameParts[filenameParts.length -1]
    } else {
      ext = " ";
    }
    const AWS_KEY_ID = config.aws.s3.accessKeyId;
    const AWS_SECRET = config.aws.s3.secretKey;
   
    AWS.config.update({
      accessKeyId: AWS_KEY_ID,
      secretAccessKey: AWS_SECRET,
      region: S3_REGION
    })
    const uuidKey = `${config.environment}/company/${companyId}/${type}/${uuid()}${ext}`;
    const s3 = new AWS.S3();
    s3.putObject({
      Bucket: S3_ROOT_BUCKET,
      Key: uuidKey,
      Body: file.buffer,
      ACL: 'public-read'
    }, async(err, result) => {
      console.log(err)
      if (err) return res.status(500).json({message:'Uploading Photo Failed'})
      
      
      const imageURL = `https://${S3_ROOT_BUCKET}.s3-${S3_REGION}.amazonaws.com/${uuidKey}`;
      
      req.image = imageURL;
      next();
    })
  }
};
