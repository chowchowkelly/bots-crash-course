'use strict'; // Main app routes

// Dependencies.

const fbWebhookRouter = require('./facebookWebhook');
const ghWebhookRouter = require('./githubWebhook');

module.exports = function(app) {

  // Set routes for the API using respective namespaces and routers.

  app.get('/', function (req, res) {
    res.send('Crash Course Bot\'s running.');
  });

  app.use('/facebook/webhook', fbWebhookRouter);
  app.use('/github/webhook', ghWebhookRouter);

};
