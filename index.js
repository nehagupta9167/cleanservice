
'use strict';

const express = require('express')
//const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const app = express()
const bodyParser = require('body-parser');
const http = require('http');
const twilio = require('twilio');

process.env.DEBUG = 'dialogflow:*'; 



const accountSid = 'ACf46eea333563a2c457fd524a938e21f2';
const authToken = 'a15564ff3d8554f579c782882ce1ba81';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000))

 app.get('/', function (req, res) {
   res.send('Use the /webhook endpoint')
 })

app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

//app.get('/', (req, res) => res.send('online'))
app.use(bodyParser.json());
//exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
app.post('/', function (req, res) {
  const agent = new WebhookClient({ request: req, response: res })

  app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  var messg = req.body.Body
  //twiml.message('Okay okay !!!');
	   if (req.body.Body == 'hello') {
    twiml.message('Hi!');
  } else if (req.body.Body == 'bye') {
    twiml.message('Goodbye');
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
	 
	 agent.add(messg);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
  
 // app.post('/', (req, res) => {
 // const twiml = new MessagingResponse();

//   if (req.body.Body == 'hello') {
//     twiml.message('Hi!');
//   } else if (req.body.Body == 'bye') {
//     twiml.message('Goodbye');
//   } else {
//     twiml.message(
//       'No Body param match, Twilio sends this in the request to your server.'
//     );
//   }

 // res.writeHead(200, { 'Content-Type': 'text/xml' });
 // res.end(twiml.toString());
//});

//http.createServer(app).listen(1337, () => {
//  console.log('Express server listening on port 1337');
//});
  
  
  
  function bookservice (agent) {
//   var givendate = req.body.queryResult.parameters['date']
//   var giventime = req.body.queryResult.parameters['time']
//   var replymsg = 'This is the response from service'
//   var sidmessg = ""
//   var webhookReply = 'the service for ' + givendate + 'and' + giventime + '.'
   

  // parameters are stored in req.body.result.parameters
  const givendate = agent.parameters.date;
  const giventime = agent.parameters.time;
  const giventext = agent.parameters.text;
  var sidmessg = "";
  const gotdate = givendate.length > 0;
  const gottime = giventime.length > 0;

  // var webhookReply = 'Okay let me check for ' + givendate + 'and' + giventime + '.'
  
  if(gotdate && gottime) {
        agent.add('Nice, you want to book f0r' +givendate+ 'at' +giventime+ '.');
    } else if (gotdate && !gottime) {
        agent.add('Let me know which time you want the service');
    } else if (gottime && !gotdate) {
        agent.add('Let me know which date you want the service');
    } else {
        agent.add('Let me know which date and time you want the service');
    }
 
//    if (req.body.queryResult.parameters['text'] == 'book') {
//     client.messages.create({
//       body: 'We want to book a cleaning service  for ' + givendate + 'and' + giventime + '.',
//       from: '+18727139684',
//       to: '+13313083436'
//      })
//     .then(message  => console.log(message.sid));
// 	   agent.add('Okay let me check for ' + givendate + 'and' + giventime + '.');
// 	   }
//    else 
//     {agent.add('Sorry some some error occured')};
  
  if ( giventext == 'book' || giventext == 'want') {
    client.messages.create({
      body: 'We want to book a cleaning service for' +givendate+ 'and' +giventime+ '.',
      from: '+18727139684',
      to: '+13313083436'
     }).then((messsage) => console.log(message.sid));
  
	agent.add('Okay let me check for ' + givendate + 'and' + giventime + '.');
  }
  else 
	  { agent.add('Sorry some some error occured')}
  
}

 let intentMap = new Map();
   intentMap.set('cleaningservice', bookservice);
  agent.handleRequest(intentMap);
//      res.status(200).json({
//      source: 'webhook',
     
//      speech: 'The  ' +replymsg+ 'for booking' +webhookReply ,
//      //sid: sidmessg,
//      displayText: 'The service provider replied: ' +replymsg+ 'for booking' +webhookReply
// 	     })
})

//app.listen(process.env.PORT || 8080)
app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
