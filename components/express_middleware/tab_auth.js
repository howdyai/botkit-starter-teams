module.exports = function(webserver, controller) {
  
  
      controller.validateUser = function(req, res, next){
          if(req.cookies.user_session){
            var upn = req.cookies.user_session.id;
            controller.storage.users.get(upn, function(err, user){
              if(err || user.length === 0){
                next();
              }else {
                req.user = user;
                next();
              }
            });
          }else {
            res.redirect('/teams/tabs/auth?src=' + req.path);
          }
      }

}