module.exports = function(controller) {
  
  
controller.hears('private', 'direct_mention', function(bot, message) {
    bot.startPrivateConversation(message, function(err, convo) {
        convo.say('this is a private message now');
    });
  
});
  
  
}