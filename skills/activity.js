module.exports = function(controller) {
  

  controller.hears('activity', 'direct_message,direct_mention', function(bot, message) {

    bot.replyWithActivity(message,{text: 'this is an activity','summary': 'this is the summary of an activity'}, function(err) {

      if (err) {
        console.error('ACTIVITY ERROR', err);
      }

    });

  });

  
}