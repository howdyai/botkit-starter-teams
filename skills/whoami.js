module.exports = function(controller) {
  
    
  controller.hears('who am i', 'direct_message, direct_mention', function(bot, message) {
    
      bot.api.getUserById(message.channel, message.user, function(err, user) {
        
          if (err) {
            bot.reply(message,'Error loading user:' + err);
          } else {
            bot.reply(message,'You are ' + user.name + ' and your email is ' + user.email + ' and your user id is ' + user.id);
          }
        
      });
    
    
  });
  
  
}