
'use strict';

const express = require('express')
//const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');
const app = express()
const bodyParser = require('body-parser');
const http = require('http');
const twilio = require('twilio');
var cors = require('cors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

process.env.DEBUG = 'dialogflow:*'; 



const accountSid = 'ACf46eea333563a2c457fd524a938e21f2';
const authToken = 'a15564ff3d8554f579c782882ce1ba81';
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const calendarId = '5vku8th8kmv278aakstslivra0@group.calendar.google.com'; // Example: 6ujc6j6rgfk02cp02vg6h38cs0@group.calendar.google.com
const serviceAccount = {
  "type": "service_account",
  "project_id": "textphp-46750",
  "private_key_id": "6e7a624d236503945c2628ffa2d571446a91ecf8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6s1lxU03/VhbQ\nUl+5hM2Xc82Rq4SbEIvClmaOjuPRkhPtRTWnKVOBgynYfzJVUhhjG7bkxjIhlYw8\npMgTc4+zpe6o73j09GrwMqWXj1SuSaCOHQe3UvcrWP0BlZhAhFMzTAFZtKZJWDir\nRGJHen5NFReQRe/MXa38Pslh+n8IhAhtyEHyDxp8QcCeMefyKrsBighCh8xLE7se\nOQUnCp8udZPg8/XVRbkHge5ivV7Fw5QclpQPYOc243eDML6sb1o9ZSr1P7kg4iZs\nTqismr1iSH+iHK7pHVDvciSh3oE3qhwOv/W27BrdhkG4WIlX+vckGwTTnpFJ4aDu\nABP07/ghAgMBAAECggEAEA3H98n//6AOyiRV0tqr4Fq20dB70JGgUup32x5Hp1z2\nQFrJKEc8xPra/aDCWo/P77BnDk5J6pVfalTeV2iCciInNCOTX7d8p+F9rQXyyXck\nn9O4jCJNhU6w7Wfy9ZPrS5KSMyfTfKRiCxK67gaHFxMPOaVUigWBe8UyWoMdqppP\nTayYFOtd9Rcwt76ZhvUXwdwN/oFHZDNxInpAhdKMrfhTIw6mObbgqPIblcNy7G4y\nC1MW+IChMI57lAF+6fv7QRlZ+JX6Kj411xJttYNJ/ppcKkk/obq3zi/3/W/upZ4D\nX6PzAMiVaHoRe1kxmHj4F9A6povJ6e08vO8FfRQ7mQKBgQD2mGgSEPeGRD7N047g\nmO5oDlf2Bc+vyVjRb1V4blqKIBPTvo7KHTKpr0EsBbHQERMqkGHEKlpZiF4RIlQm\nwXvDkz1hvMHc0V2tjnUtBW9l/fEGw75QyH/s5e+DxYhnlvbfZrsRIW6bz++3+lW+\nyzapLn89NB8wKMr6idZBLFSYKwKBgQDB0iuQBrszKh58fFm91iIvkGJC8MRSKlHa\ni1TsBnjKBDDR8JX+H5lyv5yHfrxcaGFge+RFRJfgGBwfba8fvWRvZXi4Q4xNgZ9N\nC97mG5m5AXmZTg5y8wzUr9ipCMxj0QFT1xUoNSRMRwCJrYkQEcDbS3PAiAl1ZyVt\n3xn+0Ege4wKBgQCU3Afm8AscKFJpWc6kUm2Iry/2OifXjApr03ObEbLiMt8FMcFs\nzRdqS3tiIcXnPod9aE88ZfzIk4OFgF2gT6hwtY+WUqYMsO6F+LtPhDptLVC0rrFS\nftaKoXtm5nWjYwSAc7l1a+Mjd/DT9PCSDoZetszkm3RAVD/D4jVOfn5KpQKBgH1D\nzAvFje8/ZXynEYjzgBylgBwrZ3aDC2vnaPcyJ5bIppTInOgknBPhatTXP/2pKGYn\nLBzofA/FBUf6p5gn22Vze1X7sg3VnJM6/NBTPkKnhWNjY0s/cidzjt+QZCiOyADb\nnTzjO5ZgvSQ+F7te/fm9Bg6E3TgXdcVQz4g0LKhpAoGAbhAs0sFKCvQNwv5HxhCY\nLj/7IFw5cOekQ997SSUyS5kt60ZGWtpeM98SDn2hYbtJWi2T9dM8jiE7ZLJfbK40\n2llNQX4/EgTtCVSsExcx5I5UvUz/KG4uHl72yvSBWZZiQzwgASuCSiYZnaC2AEdx\nkdgAUYVcgy7GUlje3v+Ww0c=\n-----END PRIVATE KEY-----\n",
  "client_email": "cleaning-service-calendar@textphp-46750.iam.gserviceaccount.com",
  "client_id": "115359850760651651869",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/cleaning-service-calendar%40textphp-46750.iam.gserviceaccount.com"
} ;
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
const timeZoneOffset = '+05:30';         // Change it to your time zone offset

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
  
  //agent.add('the time is ' + agent.parameters.time + '.');
  const appointmentDuration = 2;// Define the length of the appointment to be one hour.
  const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
  const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);

	// A helper function that receives Dialogflow's 'date' and 'time' parameters and creates a Date instance.
function convertParametersDate(date, time){
  return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('+')[0] + timeZoneOffset));
}

// A helper function that adds the integer value of 'hoursToAdd' to the Date instance 'dateObj' and returns a new Data instance.
function addHours(dateObj, hoursToAdd){
  return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

	var schemaName = new Schema({
	request: String,
	timestart: String,
	timeend: String
}, {
	collection: 'collectionName'
});

var Model = mongoose.model('Model', schemaName);
mongoose.connect('mongodb://127.0.0.1/dbName');

app.get('/save/:query', cors(), function(req, res) {
	var query = req.params.query;

	var savedata = new Model({
		'request': query,
		'timestart': dateTimeStart,  // Time of save the data in unix timestamp format
		'timeend': dateTimeEnd
	}).save(function(err, result) {
		if (err) throw err;

		if(result) {
			res.json(result)
		}
	})
})

app.get('/find/:query', cors(), function(req, res) {
	var query = req.params.query;

	Model.find({
		'request': query
	}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			}))
		}
	})
})

// var port = process.env.PORT || 8080;
// app.listen(port, function() {
// 	console.log('Node.js listening on port ' + port);
// });
	
	
  app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  var messg = req.body.Body
  //twiml.message('Okay okay !!!');
	   if (req.body.Body == 'fine') {
    twiml.message('Hi!');
    
		   calendar.events.insert({
  auth: serviceAccountAuth,
  calendarId: calendarId,
  resource: {
          'summary': 'Clesning service',
          'start': { 
	     'dateTime':  dateTimeStart,
             'timeZone': 'Asia/Kolkata', 
            },
          'end': {
             'dateTime':  dateTimeEnd,
             'timeZone': 'Asia/Kolkata',
             }
	  },
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
  } else if (req.body.Body == 'no') {
    twiml.message('Goodbye');
  } else {
    twiml.message(
      'No Body param match, Twilio sends this in the request to your server.'
    );
  }
	  

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
	 
	 agent.add(req.body.Body);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
  

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
//     client.messages.create({
//       body: 'We want to book a cleaning service for' +givendate+ 'and' +giventime+ '.',
//       from: '+18727139684',
//       to: '+13313083436'
//      }).then((messsage) => console.log(message.sid));
  
	agent.add('Okay let me check for ' + givendate + 'and' + giventime + '.');
  }
  else 
	  { agent.add('Sorry some some error occured')}
  
}

 let intentMap = new Map();
   intentMap.set('cleaningservice', bookservice);
  agent.handleRequest(intentMap);
	

  
})

//app.listen(process.env.PORT || 8080)
app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
