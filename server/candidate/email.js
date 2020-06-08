import AWS from 'aws-sdk';

AWS.config.update({region: 'us-west-2'});

let params = {
  Destination: { /* required */
    ToAddresses: [
      'amazingshellyyy@gmail.com',
      /* more items */
    ]
  },
  Message: { /* required */
    Body: { /* required */
      Html: {
       Charset: "UTF-8",
       Data: "HTML_FORMAT_BODY"
      },
      Text: {
       Charset: "UTF-8",
       Data: "TEXT_FORMAT_BODY"
      }
     },
     Subject: {
      Charset: 'UTF-8',
      Data: 'Test email from twstartups'
     }
    },
  Source: 'twstartups.service@gmail.com', /* required */
  ReplyToAddresses: [
     'twstartups.service@gmail.com',
    /* more items */
  ],
}

let sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();

sendPromise
  .then(data => {
    console.log(data.MessageId)
  })
  .catch(err => {
    console.error(err, err.statck);
  })