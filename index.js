
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:*'; 



const accountSid = 'ACf46eea333563a2c457fd524a938e21f2';
const authToken = 'a15564ff3d8554f579c782882ce1ba81';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  
  function bookservice (agent) {
    
   

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
});

