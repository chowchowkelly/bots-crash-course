'use strict'; // Facebook Message Composer.

// Compose out defined generic object to a facebook message.

const facebookOutputComposer = (function() {

  const composeFBMessage = (messages) => {
    let messagesToSend = []
    messages.forEach( (message) => {
      let payload = message.payload;

      switch (message.type) {
        case 'text':
          messagesToSend.push(composeTextMessage(payload.text));
          break;

        case 'text_array':
          payload.text.forEach(singleText => {
            messagesToSend.push(composeTextMessage(singleText));
          });
          break;

        case 'static_button':
          messagesToSend.push(composeButtonMessage(payload.text, payload.buttons));
          break;

        case 'reply_button':
          messagesToSend.push(composeQuickReplyMessage(payload.text, payload.buttons));
          break;

        case 'card':
          messagesToSend.push(composeGenericMessage(payload));
          break;

        case 'card_array':
          payload.forEach(singlePayload => {
            messagesToSend.push(composeGenericMessage([singlePayload]));
          });
          break;

        case 'media':
          messagesToSend.push(composeMediaMessage(payload));
          break;

        default:
          console.log('Unsuported message type');
      }

    });

    return messagesToSend;
  };

  const composeTextMessage = (text) => {
    return {
      text: text
    };
  }

  const composeTextArrayMessage = (payload) => {
    return {
      text: payload.text
    };
  }

  const composeMediaMessage = (content) => {
    return {
      'attachment':{
        'type': content.media_type,
        'payload':{
          'url': content.url
        }
      }
    };
  }

  const composeQuickReplyMessage = (text, buttons) => {

    const composedQuickReplies = composeQuickReplies(buttons);

    return {
      'text': text,
      'quick_replies': composedQuickReplies
    };
  }

  const composeButtonMessage = (text, buttons) => {

    const composedButtons = composeButtons(buttons);

    return {
      'attachment':{
        'type':'template',
        'payload':{
          'template_type':'button',
          'text': text,
          'buttons': composedButtons
        }
      }
    };
  }

  const composeGenericMessage = (elements) => {

    const composedElements = composeGenericElements(elements);

    return {
      'attachment':{
        'type':'template',
        'payload':{
          'template_type':'generic',
          'elements': composedElements
        }
      }
    };

  }

  const composeQuickReplies = (quickReplies) => {
    let composedQuickReplies = quickReplies.map( quickReply => {

      let composedQuickReply = {
        // The content_type can either be text or location. Only text is
        // suported.
        content_type: 'text',
        title: quickReply.title
      }

      if (quickReply.type == 'postback') {
        composedQuickReply.payload = quickReply.payload;
      }

      return composedQuickReply;
    });

    return composedQuickReplies;
  }

  const composeButtons = (buttons) => {

    let composedButtons = buttons.map( button => {

      let composedButton = {
        title: button.title,
        type:  button.type
      }

      if(button.type === 'web_url')
        composedButton.url     = button.payload;
      else
        composedButton.payload = button.payload;

      return composedButton;
    })

    return composedButtons;

  }

  const composeGenericElements = (elements) => {

    let genericElements = elements.map( element => {

      let composedButtons = element.buttons? composeButtons(element.buttons) : undefined;

      let genericElement = {
        title:     element.title,
        subtitle:  element.subtitle,
        image_url:  element.image,
      }

      if(composedButtons)
        genericElement.buttons   = composedButtons;

      return genericElement;

    })

    return genericElements;
  }

  // Public function.

  return composeFBMessage;

})();

module.exports = facebookOutputComposer;
