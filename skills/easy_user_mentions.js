var async = require('async');

module.exports = function(controller) {


  controller.middleware.send.use(function(bot, message, next) {

    var matches;
    var uniques = [];
    if (matches = message.text.match(/\<\@(.*?)\>/igm)) {

      for (var m = 0; m < matches.length; m++) {
        if (uniques.indexOf(matches[m]) == -1) {
          uniques.push(matches[m]);
        }
      }

      async.each(uniques, function(match, next_match) {

        var uid = match.replace(/^\<\@/,'').replace(/\>$/,'');

        bot.api.getUserById(message.serviceUrl, message.conversation.id,  uid, function(err, user_profile) {

          if (user_profile) {
            var pattern = new RegExp('<@' + uid + '>','g');
            message.text = message.text.replace(pattern, '<at>@' + user_profile.name + '</at>');

            if (!message.entities) {
              message.entities = [];
            }

            message.entities.push({
              type: 'mention',
              mentioned: {
                id: uid,
                name: user_profile.name,
              },
              text: '<at>@' + user_profile.name + '</at>',
            });
          }

          next_match();

        });

      }, function() {


        next();

      })
    } else {

      next();
    }

  });




}
