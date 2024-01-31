var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  method: 'POST',
  hostname: 'y3xz29.api.infobip.com',
  path: '/sms/2/text/advanced',
  headers: {
    Authorization:
      'App 1b6fcec692749fbf5c15386c0b307c24-e4d3cf6b-d261-4f76-b4c6-b5b3acff37dc',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  maxRedirects: 20,
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on('data', function (chunk) {
    chunks.push(chunk);
  });

  res.on('end', function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on('error', function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  messages: [
    {
      destinations: [{ to: '213561436158' }, { to: '213562028146' }],
      from: 'ISInnovate',
      text: 'Inass OTP s SMS ylehu ara!',
    },
  ],
});

req.write(postData);

req.end();
