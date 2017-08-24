var async = require('async');

module.exports = function(controller) {
  
  
  
  // This middleware looks for Slack-style user mentions in a message
  // <@USERID> and translates them into Microsoft Teams style mentions
  // which look like <at>@User Name</at> and have a matching row in the
  // message.entities field.
  controller.middleware.send.use(function(bot, message, next) {

    var matches;
    var uniques = [];

    // extract all the <@USERID> patterns
    if (matches = message.text.match(/\<\@(.*?)\>/igm)) {
      
      // get a set of UNIQUE mentions - since the lookup of profile data is expensive
      for (var m = 0; m < matches.length; m++) {
        if (uniques.indexOf(matches[m]) == -1) {
          uniques.push(matches[m]);
        }
      }
      
      // loop over each mention      
      async.each(uniques, function(match, next_match) {
        
        var uid = match.replace(/^\<\@/,'').replace(/\>$/,'');
        
        // use the teams API to load the latest profile information for the user
        bot.api.getUserById(message.channel,  uid, function(err, user_profile) {
        
          // if user is valid, replace the Slack-style mention and append to entities list
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
        
        // we've processed all the matches, continue
        next();        
        
      })
    
    } else {
    
      // if there were no matches, continue
      next();

    }
    
  });
  
  
  
  
}