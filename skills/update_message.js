/*
    Demonstrate how to use `updateMessage()` to replace an existing message
    with a new one!
*/
module.exports = function(controller) {

  controller.hears('update', 'direct_message,direct_mention', function(bot, message) {
    bot.reply(message, 'This is the original message', function(err, poll_message) {

      bot.api.updateMessage(message.channel, poll_message.id, {
        type: 'message',
        text: 'This message has UPDATED CONTENT'
      }, function(err) {
        if (err) {
          console.error(err);
        }
      });


    });

  })




}
