module.exports = function(webserver, controller) {

  webserver.post('/teams/receive', function(req, res) {
    var message = req.body;

    var bot = controller.spawn({
      serviceUrl: message.serviceUrl,
    });

    controller.ingest(bot, message, res);

  });

  webserver.get('/', function(req, res) {
    // console.log('process.env: ', process.env);
    res.render('index', {
      bot_client_id: process.env.client_id,
      layout: 'layouts/default'
    });
  });

}
