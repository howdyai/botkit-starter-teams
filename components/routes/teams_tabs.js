module.exports = function(webserver, controller) {

  var teams_headers = {
    'Content-Security-Policy': 'frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com',
    'X-Frame-Options': 'ALLOW-FROM https://teams.microsoft.com/'
  }


  webserver.get('/teams/tabs/auth', function(req, res) {
    res.set(teams_headers);
    res.render('tab_auth', {
      src_url: req.query.src,
      layout: 'layouts/tabs',
    });
  });


  webserver.post('/teams/tabs/auth', function(req, res) {

    res.set(teams_headers);

    // check that a upn value has been specified
    if (req.body.upn) {
      var upn = req.body.upn;
      // check to see if an existing user is present
      controller.storage.users.get(upn, function(err, user) {

        // if no user is present, create an empty record
        if (err || user.length === 0) {
          user = {
            id: upn
          }
        }

        // store the user record
        controller.storage.users.save(user, function(err) {

          // if successful, return a success and set a cookie
          if (!err) {

            var expires = new Date();
            expires.setDate(expires.getDate() + 365);

            res.cookie('user_session', {
              id: upn,
            }, {
              expires: expires,
            });

            res.render('tab_auth_resolve', {
                success: true,
                token: expires,
                src: req.body.src,
                layout: 'layouts/tabs',
              });
          } else {
            res.render('tab_auth_resolve', {
                success: false,
                src: req.body.src,
                layout: 'layouts/tabs',
              });
          }
        });
      });
    } else {
      res.render('tab_auth_resolve', {
          success: false,
          src: req.body.src,
          layout: 'layouts/tabs',
        });
    }
  });


  webserver.get('/teams/tabs/configure', controller.validateUser, function(req, res) {
    res.set(teams_headers);

    res.render('tab_conf', {
      layout: 'layouts/tabs',
      botkit_host: 'https://' + req.get('host'),
    });
  });

  webserver.get('/teams/tabs/notesByChannel/:channel', controller.validateUser, function(req, res) {
    res.set(teams_headers);

    res.render('tab_configurable', {
      channel_id: req.params.channel,
      layout: 'layouts/tabs',
    });
  });


  webserver.get('/teams/tabs/api/notes', controller.validateUser, function(req, res) {
    res.set(teams_headers);

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
    res.set(teams_headers);

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
    res.set(teams_headers);

    res.render('tab_static', {
      layout: 'layouts/tabs',
    });
  });

  webserver.get('/teams/tabs/remove', controller.validateUser, function(req, res) {
    res.set(teams_headers);

    res.render('tab_remove', {
      layout: 'layouts/tabs',
    });
  });

}
