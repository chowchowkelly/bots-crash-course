'use strict';

// Dependencies.

const express  = require('express');

//Routes for the Facebook Webhook API.

let router = express.Router();

const postWebhook = (event) => {
  console.log(event);
  console.log(event.body);
  console.log(event.body.pusher);
}

router.post('/', postWebhook);

module.exports = router;