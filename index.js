'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; 

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();

const accountSid = 'ACf46eea333563a2c457fd524a938e21f2';
const authToken = 'a15564ff3d8554f579c782882ce1ba81';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000))


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  
  function bookservice (agent) {
    
    app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})
app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.use(bodyParser.json());
app.post('/', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  console.log(req.body)
  

  
  // and some validation too
  if (!req.body ) {
    return res.status(400).send('Bad Request')
  }
 
  //const util = require('util')

  
//    if (!req.body.result ) {
//     return res.status(400).send('Bad Request1' + util.inspect(req.body, {showHidden: false, depth: null}) + req.body['date'])
//   }
 
//   if ( !req.body.result.parameters) {
//     return res.status(400).send('Bad Request2')
//   }

  // the value of Action from api.ai is stored in req.body.result.action
  console.log('* Received action -- %s', req.body.action)

  // parameters are stored in req.body.result.parameters
  var givendate = req.body['date']
  var giventime = req.body['time']
  var sidmessg = ""
  var webhookReply = 'Okay let me check for ' + givendate + 'and' + giventime + '.'
  
//respone
//  if (req.body['text'].toString().trim() == 'book') {
// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });

// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });
//}
//  else 
//   {return res.send('message not sent')};
 
//  res.status(200).json({
//     source: 'webhook',
//     speech: webhookReply,
//     sid: sidmessg,
//     displayText: webhookReply
//     })
  
  // the most basic response
  
  
  if (req.body['text'].toString().trim() == 'book') {
    client.messages.create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+18727139684',
      to: '+14047954576'
     })
    .then(message  => sidmessg = message.sid);
   // => console.log(message.sid)
    //res.send('message sent')
    res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    sid: sidmessg,
    displayText: webhookReply
  })
  }
  else 
   {return res.send('message not sent')};
 
  
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
}
  
