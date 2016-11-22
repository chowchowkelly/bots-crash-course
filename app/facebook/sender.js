const rp = require('request-promise');

// Set Facebook Values
const verify_token = process.env.FB_VERIFY_TOKEN;
const token = process.env.FB_PAGE_ACCESS_TOKEN;

const facebookSender = {

  sendTextMessage: function(recipientId, messageText) {
    var messageData = {
      text: messageText
    };

    this.sendMessage(recipientId, messageData);
  },

  sendMessage(recipientId, message) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: message
    };

    return this.callSendAPI(messageData);
  },

  sendAction(recipientId, action) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: action
    };

    return this.callSendAPI(messageData);
  },

  sendNotification(recipientId, textMessage, notificationType) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: textMessage
      },
      notification_type: notificationType
    };

    return this.callSendAPI(messageData);
  },

  callSendAPI: function(messageData) {
    const options = {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: token },
      method: 'POST',
      json: messageData
    }

    return rp(options);
  }

};

module.exports = facebookSender;
