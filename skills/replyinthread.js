module.exports = function(controller) {
  
  
  controller.hears('thread', 'direct_mention', function(bot, message) {
      bot.replyInThread(message, 'This was important enough to start a new thread');
  });
  
  
}