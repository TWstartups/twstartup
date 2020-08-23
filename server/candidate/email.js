import AWS from 'aws-sdk'
import config from '../config'
import template from './emailTemplate'

AWS.config.update({
  region: config.aws.ses.region,
  accessKeyId: config.aws.ses.accessKeyId,
  secretAccessKey: config.aws.ses.secretKey
})

export default {
  send: (toEmail, name) => {
    const html = template.getHTML(name)
    return new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail({
      Destination: { /* required */
        ToAddresses: [
          toEmail
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
            Charset: 'UTF-8',
            Data: html
          },
          Text: {
            Charset: 'UTF-8',
            Data: 'showw text'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'You are approved'
        }
      },
      Source: 'twstartups.service@gmail.com', /* required */
      ReplyToAddresses: [
        'twstartups.service@gmail.com'
        /* more items */
      ]
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
