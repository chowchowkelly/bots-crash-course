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
            if(messagingEvent.message) { // Subscribes to Message Received Callback

              let senderID    = messagingEvent.sender.id,
                  textMessage = messagingEvent.message.text;

              sender.sendTextMessage(senderID, textMessage);

              /*
              switch (messageText) {
                case 'image':
                  this.sendImageMessage(senderID);
                  break;

                case 'button':
                  this.sendButtonMessage(senderID);
                  break;

                case 'generic':
                  this.sendGenericMessage(senderID);
                  break;

                case 'receipt':
                  this.sendReceiptMessage(senderID);
                  break;

                case 'image me':
                  this.sendTextMessage(senderID, "jeje");
                  break;

                default:
                  this.sendTextMessage(senderID, messageText);
              }
              */

            } else if(messagingEvent.postback) { // Subscribes to Postback Received Callback

            } else if(messagingEvent.optin) { // 	Subscribes to Authentication Callback via the Send-to-Messenger Plugin

            } else if(messagingEvent.delivery) { // Subscribes to Message Delivered Callback

            } else if(messagingEvent.read) { // Subscribes to Message Read Callback

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
