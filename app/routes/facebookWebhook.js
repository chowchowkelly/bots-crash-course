'use strict';

// Dependencies.

const express  = require('express');
const facebook = require('../facebook/controller');


//Routes for the Facebook Webhook API.

let router = express.Router();

router.get('/', facebook.getWebhook);
router.post('/', facebook.postWebhook);

module.exports = router;