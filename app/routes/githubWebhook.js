'use strict';

// Dependencies.

const express  = require('express');
const sender   = require('../facebook/sender');

//Routes for the Facebook Webhook API.

let router = express.Router();

const postWebhook = (event) => {

  let gitUser        = event.body.pusher.name,
      repositoryName = event.body.repository.name,
      textMessage;

  textMessage = `${gitUser} just pushed to "${repositoryName}" repository :o`;

  sender.sendTextMessage(1476968802330866, textMessage);

}

router.post('/', postWebhook);

module.exports = router;