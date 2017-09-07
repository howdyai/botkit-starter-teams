/*
    Demonstrates how to use `startPrivateConversation()` to shift from a public
    channel to a 1:1 discussion with the bot.
*/

module.exports = function(controller) {

  controller.hears('private', 'direct_mention', function(bot, message) {
    bot.startPrivateConversation(message, function(err, convo) {
      convo.say('this is a private message now');
    });
  });


}
