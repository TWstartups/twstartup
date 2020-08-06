
export default {
  getHTML: (username) => {
    return `<html>
    <head>
      <title></title>
      <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
    </head>
    <body aria-readonly="false">
    <p>Hi,${username}</br>Your company is approved. </br> We will ask you to provide more information to furnish up your profile: <a href="https://twstartups.github.io/twstartups/#/">https://twstartups.github.io/twstartups/#/</a></br>Please visit <a href="https://twstartups.github.io/twstartups/#/">here</a> for public company page.</br></p>
    <p>Best,</br>twstartup team</p>
    </body>
    </html>`
  }
}
