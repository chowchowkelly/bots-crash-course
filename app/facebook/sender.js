const rp = require('request-promise');

// Set Facebook Values.

const verify_token = process.env.FB_VERIFY_TOKEN;
const token        = process.env.FB_PAGE_ACCESS_TOKEN;

const facebookSender = {

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

  sendTextMessage: function(recipientId, messageText) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText,
        metadata: 'metadatos lol'
      }
    };

    return this.callSendAPI(messageData);
  },

  sendImageMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'image',
          payload: {
            url: 'https://lh3.googleusercontent.com/-sCY0Ap_Gz68/V2BEffdlzjI/AAAAAAAAAK0/ClArIEgsRN8CaUvwdFuFlx_b44muA9FCA/w800-h800/TDCC_Gameshow_Final_WO_800.jpg'
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendAudioMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'audio',
          payload: {
            url: 'http://www.noiseaddicts.com/samples_1w72b820/4939.mp3'
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendVideoMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'video',
          payload: {
            url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendFileMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'file',
          payload: {
            url: 'http://www.pdf995.com/samples/pdf.pdf'
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendButtonMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          'type':'template',
          'payload':{
            'template_type':'button',
            'text':'What do you want to do next?',
            'buttons':[
              {
                'type':'web_url',
                'url':'https://javascript.com',
                'title':'Show Website'
              },
              {
                'type':'postback',
                'title':'Start Chatting',
                'payload':'Defined Payload on Start Chatting Postback'
              },
              {
                'type':'phone_number',
                'title':'Call AI Mentor',
                'payload':'+5213310200811'
              }
            ]
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendGenericMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          'type':'template',
          'payload': {
            'template_type':'generic',
            'elements':[
              {
                'title':'Gdl is Awesome!',
                'subtitle':'Hello AI Academy!.',
                'item_url': 'http://www.insidehook.com/nation/the-insiders-guide-to-visiting-guadalajara-mexico',
                'image_url':'http://s4.insidehook.com/Guadalajara_Hea_1479746030.jpg',
                'buttons':[
                  {
                    'type':'element_share'
                  }
                ]
              }
            ]
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendListMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          'type':'template',
          'payload': {
            'template_type': 'list',
            'top_element_style': 'large',
            'elements': [
              {
                'title': 'Luis Music Collection',
                'image_url': 'https://image.freepik.com/free-vector/circle-made-of-music-instruments_23-2147509304.jpg',
                'subtitle': 'See all of his Records',
                'default_action': {
                  'type': 'web_url',
                  'url': 'https://open.spotify.com/user/legtzp/playlist/5vfWXrW4C23LTxHMxGpNZg',
                  'webview_height_ratio': 'tall',
                },
                'buttons': [
                  {
                    'title': 'Play it!',
                    'type': 'web_url',
                    'url': 'https://open.spotify.com/user/legtzp/playlist/5vfWXrW4C23LTxHMxGpNZg',
                    'webview_height_ratio': 'tall',
                  }
                ]
              },
              {
                'title': 'White Lies',
                'image_url': 'https://upload.wikimedia.org/wikipedia/en/2/24/White_Lies_Big_TV_cover.jpg',
                'subtitle': 'Getting Even',
                'default_action': {
                  'type': 'web_url',
                  'url': 'https://open.spotify.com/track/7aovkxVF2B9I3SKXGTxnA9',
                  'webview_height_ratio': 'tall',
                },
                'buttons': [
                  {
                    'title': 'Listen to it!',
                    'type': 'web_url',
                    'url': 'https://open.spotify.com/track/7aovkxVF2B9I3SKXGTxnA9',
                    'webview_height_ratio': 'tall',
                  }
                ]
              },
              {
                'title': 'Elton John',
                'image_url': 'http://cdn.pursuitist.com/wp-content/uploads/2015/10/Elton-John.jpg',
                'subtitle': 'Tiny Dancer',
                'default_action': {
                  'type': 'web_url',
                  'url': 'https://open.spotify.com/track/2TVxnKdb3tqe1nhQWwwZCO',
                  'webview_height_ratio': 'tall',
                },
                'buttons': [
                  {
                    'title': 'Listen Elton John Now!',
                    'type': 'web_url',
                    'url': 'https://open.spotify.com/track/2TVxnKdb3tqe1nhQWwwZCO',
                    'webview_height_ratio': 'tall',
                  }
                ]
              }
            ],
            'buttons': [
              {
                'title': 'View More',
                'type': 'postback',
                'payload': 'View More Songs'
              }
            ]
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendReceiptMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        'attachment':{
          'type':'template',
          'payload':{
            'template_type':'receipt',
            'recipient_name':'Luis Gutierrez',
            'order_number':'22348078902',
            'currency':'MXN',
            'payment_method':'Visa 1992',
            'order_url':'http://petersapparel.parseapp.com/order?order_id=123456',
            'timestamp':'1480196200',
            'elements':[
              {
                'title':'Tourist History Vynil',
                'subtitle':'Two Door Cinema Club',
                'quantity':2,
                'price':500,
                'currency':'MXN',
                'image_url':'https://images-na.ssl-images-amazon.com/images/I/810i3%2BM6%2BpL._SX522_.jpg'
              },
              {
                'title':'Wolfgang Amadeus Phoenix Vinyl',
                'subtitle':'Phoenix',
                'quantity':1,
                'price':800,
                'currency':'MXN',
                'image_url':'https://images-na.ssl-images-amazon.com/images/I/51DowW3IgVL.jpg'
              }
            ],
            'address':{
              'street_1':'Mariano Otero 490',
              'street_2':'Edificio B-1',
              'city':'Zapopan',
              'postal_code':'43050',
              'state':'Ja',
              'country':'MX'
            },
            'summary':{
              'subtotal':1800.00,
              'shipping_cost':200.00,
              'total_tax':333.0,
              'total_cost':2183.00
            },
            'adjustments':[
              {
                'name':'Descuento por Cliente Nuevo',
                'amount':-100.00
              },
              {
                'name':'Cupon de $50',
                'amount':-50.00
              }
            ]
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendAirlineMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      'message': {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'airline_checkin',
            'intro_message': 'Check-in is available now.',
            'locale': 'en_US',
            'pnr_number': 'WizeAi',
            'flight_info': [
              {
                'flight_number': 'V0101',
                'departure_airport': {
                  'airport_code': 'GDL',
                  'city': 'Guadalajara',
                  'terminal': 'T2',
                  'gate': 'G8'
                },
                'arrival_airport': {
                  'airport_code': 'SEA',
                  'city': 'Seattle',
                  'terminal': 'T4',
                  'gate': 'G8'
                },
                'flight_schedule': {
                  'boarding_time': '2016-12-05T15:05',
                  'departure_time': '2016-12-05T15:45',
                  'arrival_time': '2016-12-05T17:30'
                }
              }
            ],
            'checkin_url': 'https:\/\/www.wizeline.com'
          }
        }
      }
    };

    return this.callSendAPI(messageData);
  },

  sendQuickRepliesMessage: function(recipientId) {
    let messageData = {
      recipient: {
        id: recipientId
      },
      'message':{
        'text':'Pick One:',
        'quick_replies':[
          {
            'content_type':'text',
            'title':'Arctic Monkeys',
            'payload':'He choose AM!',
            'image_url':'http://www.arcticmonkeys.com/metaimage.jpg'
          },
          {
            'content_type':'text',
            'title':'The Weeknd',
            'payload':'Useful data',
            'image_url':'http://www.energy941.com/wp-content/uploads/2016/09/TheWeekndDownloadPageSeptember212016-e1474571477627.gif'
          },
          {
            'content_type':'location',
          }
        ]
      }
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
