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

  webserver.get('/teams/tabs/auth', function(req, res) {
    res.render('tab_auth', {
      src_url: req.query.src,
      layout: 'layouts/default'
    });
  });


  webserver.post('/teams/tabs/auth', function(req, res) {
    var expires = new Date();
    expires.setDate(expires.getDate() + 365);
    if (req.body.upn) {
      var upn = req.body.upn;
      controller.storage.users.get(upn, function(err, user) {
        console.log('user: ', user);
        if (err || user.length === 0) {
          console.log('err: ', err);
          // add user
          controller.storage.users.save({
            id: upn
          }, function(err) {
            if (!err) {
              res.cookie('user_session', {
                id: upn
              }, {
                expires: expires,
              });
              // render authentication success
              res.render('tab_auth_resolve', {
                token: expires,
                src: req.body.src,
                success: true,
                layout: 'layouts/default'
              });
            } else {
              res.render('tab_auth_resolve', {
                success: false,
                src: req.body.src,
                layout: 'layouts/default'
              });
            }
          });
        } else {
          res.cookie('user_session', {
            id: user.id
          }, {
            expires: expires,
          });
          // render authentication success
          res.render('tab_auth_resolve', {
            token: expires,
            src: req.body.src,
            success: true,
            layout: 'layouts/default'
          });
        }
      });
    } else {
      // render authentication fail
      res.render('tab_auth_resolve', {
        src: req.body.src,
        success: false,
        layout: 'layouts/default'
      });
    }
  });


  webserver.get('/teams/tabs/configure', controller.validateUser, function(req, res) {
    res.render('tab_conf', {
      layout: 'layouts/default'
    });
  });

  webserver.get('/teams/tabs/notesByChannel/:channel', controller.validateUser, function(req, res) {
    res.render('tab_configurable', {
      channel_id: req.params.channel,
      layout: 'layouts/default',
    });
  });


  webserver.get('/teams/tabs/api/notes', controller.validateUser, function(req, res) {

    controller.storage.users.get(req.cookies.user_session.id, function(err, user) {

      var notes = user ? user.notes : [];
      notes = notes.sort(function(a, b) {
        a = new Date(a.time);
        b = new Date(b.time);
        return a > b ? -1 : a < b ? 1 : 0;

      });
      res.json(notes);

    });

  });


  webserver.get('/teams/tabs/api/notesByChannel/:channel', controller.validateUser, function(req, res) {

    controller.storage.channels.get(req.params.channel, function(err, channel) {

      var notes = channel ? channel.notes : [];
      notes = notes.sort(function(a, b) {
        a = new Date(a.time);
        b = new Date(b.time);
        return a > b ? -1 : a < b ? 1 : 0;

      });
      res.json(notes);

    });

  });


  webserver.get('/teams/tabs/static', controller.validateUser, function(req, res) {

    res.render('tab_static', {
      layout: 'layouts/default',
    });
  });

  webserver.get('/teams/tabs/remove', controller.validateUser, function(req, res) {
    res.render('tab_remove', {
      layout: 'layouts/default'
    });
  });

}
