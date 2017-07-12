module.exports = function(webserver, controller) {

  webserver.post('/teams/receive', function(req, res) {
    var message = req.body;
    console.log('message: ', message);

    var bot = controller.spawn({});

    bot.serviceUrl = message.serviceUrl;
    controller.ingest(bot, message, res);

  });

}
