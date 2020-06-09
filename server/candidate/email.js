import AWS from 'aws-sdk';
import config from '../config';


AWS.config.update({
  region: config.aws.ses.region,
  accessKeyId: config.aws.ses.accessKeyId,
  secretAccessKey: config.aws.ses.secretKey
});


export default {
  send: (toEmail, subject, content) => {
    return new AWS.SES({apiVersion: '2010-12-01'}).sendEmail({
      Destination: { /* required */
        ToAddresses: [
          toEmail,
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
           Charset: "UTF-8",
           Data: `<html>
           <head>
             <title></title>
             <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
           </head>
           <body aria-readonly="false">You are approved!</body>
           </html>
           `
          },
          Text: {
           Charset: "UTF-8",
           Data: content
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: 'twstartups.service@gmail.com', /* required */
      ReplyToAddresses: [
         'twstartups.service@gmail.com',
        /* more items */
      ],
    }).promise()
  } 
}

// sendPromise
//   .then(data => {
//     console.log('emailsent!',data.MessageId)
//   })
//   .catch(err => {
//     console.error(err, err.statck);
//   })