const sender         = require('./sender');

const FacebookController = (function () {
  return {

    getWebhook: function(req, res) {
      if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
        console.log('Validating Facebook webhook');
        res.status(200).send(req.query['hub.challenge']);
      } else {
        console.error('Failed validation. Make sure the validation tokens match.');
        res.sendStatus(403);
      }
    },

    postWebhook: function(req, res) {
      let data = req.body;

      // Make sure this is a page subscription
      if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
          let pageID      = pageEntry.id;
          let timeOfEvent = pageEntry.time;

          // Iterate over each messaging event
          pageEntry.messaging.forEach(function(messagingEvent) {
            if (messagingEvent.message) { // Subscribes to Message Received Callback

              let senderID    = messagingEvent.sender.id,
                  textMessage = messagingEvent.message.text,
                  city;

              console.log(messagingEvent);
              switch (true) {

                case /^weather/gi.test(textMessage):
                  city = textMessage.split(' ')[1];
                  sender.sendWeatherMessage(senderID, city);
                  break;

                case /^seen/gi.test(textMessage):
                  sender.sendAction(senderID, 'mark_seen');
                  break;

                case /^write/gi.test(textMessage):
                  sender.sendAction(senderID, 'typing_on');
                  break;

                case /^stopWriting/gi.test(textMessage):
                  sender.sendAction(senderID, 'typing_off');
                  break;

                case /^silent/gi.test(textMessage):
                  sender.sendNotification(senderID, 'Silent Notification', 'SILENT_PUSH');
                  break;

                case /^noPush/gi.test(textMessage):
                  sender.sendNotification(senderID, 'No Notification', 'NO_PUSH');
                  break;

                case /^image/gi.test(textMessage):
                  sender.sendImageMessage(senderID);
                  break;

                case /^audio/gi.test(textMessage):
                  sender.sendAudioMessage(senderID);
                  break;

                case /^video/gi.test(textMessage):
                  sender.sendAction(senderID, 'typing_on');
                  sender.sendVideoMessage(senderID);
                  break;

                case /^file/gi.test(textMessage):
                  sender.sendAction(senderID, 'typing_on');
                  sender.sendFileMessage(senderID);
                  break;

                case /^button/gi.test(textMessage):
                  sender.sendButtonMessage(senderID);
                  break;

                case /^generic/gi.test(textMessage):
                  sender.sendGenericMessage(senderID);
                  break;

                case /^list/gi.test(textMessage):
                  sender.sendListMessage(senderID);
                  break;

                case /^receipt/gi.test(textMessage):
                  sender.sendReceiptMessage(senderID);
                  break;

                case /^airline/gi.test(textMessage):
                  sender.sendAirlineMessage(senderID);
                  break;

                case /^quick/gi.test(textMessage):
                  sender.sendQuickRepliesMessage(senderID);
                  break;

                default:
                  sender.sendTextMessage(senderID, textMessage);
              }

            } else if(messagingEvent.postback) { // Subscribes to Postback Received Callback

              console.log(messagingEvent.postback);

            } else if(messagingEvent.optin) { // 	Subscribes to Authentication Callback via the Send-to-Messenger Plugin

            } else if(messagingEvent.delivery) { // Subscribes to Message Delivered Callback

              console.log('The User received our message!');

            } else if(messagingEvent.read) { // Subscribes to Message Read Callback

              console.log('Leyo el mensaje!');

            } else {
              console.log('Webhook received unknown messagingEvent: ', messagingEvent);
            }
          });
        });
      }

      // Assume all went well.
      //
      // You must send back a 200, within 20 seconds, to let us know you've
      // successfully received the callback. Otherwise, the request will time out.

      res.sendStatus(200);
    }
  };
}());

module.exports = FacebookController;
