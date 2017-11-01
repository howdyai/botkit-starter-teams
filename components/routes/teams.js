module.exports = function(webserver, controller) {

  webserver.post('/teams/receive', function(req, res) {

    var message = req.body;

    var options = {
        serviceUrl: message.serviceUrl,
    }

    // add team id to config
    if (message.channelData && message.channelData.team && message.channelData.team.id) {
        options.team = message.channelData.team.id;
    }

    var bot = controller.spawn(options);

    // set bot's identity based on the recipient field
    // this makes bot.identity.name and bot.identity.id available
    if (message.recipient) {
      bot.identity = message.recipient;
    }

    controller.ingest(bot, message, res);

  });

  webserver.get('/', function(req, res) {
    // console.log('process.env: ', process.env);
    res.render('index', {
      bot_client_id: process.env.clientId,
      layout: 'layouts/default'
    });
  });

}
