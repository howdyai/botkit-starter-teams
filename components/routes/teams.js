module.exports = function(webserver, controller) {

  webserver.post('/teams/receive', function(req, res) {
    var message = req.body;
    console.log('message: ', message);

    var bot = controller.spawn({});

    bot.serviceUrl = message.serviceUrl;
    controller.ingest(bot, message, res);

  });

  // need to build these addresses for the manifest.json
  webserver.get('/teams/tabs/configurable', function(req, res) {
    console.log('configurable req.body', req.body);
    // res.send('configurable tab');
    res.render('tab_conf', {
      layout: 'layouts/default'
    });
  });

  webserver.get('/teams/tabs/static', function(req, res) {
    console.log('static req.body', req.body);
    // res.send('static tab');
    res.render('tab_static', {
      layout: 'layouts/default'
    });
  });

  webserver.get('/teams/incomingWebHook', function(req, res) {
    console.log('static req.body', req.body);
    // res.send('static tab');
    res.json({example: 'incoming webhook'});
  });

}
