module.exports = function(controller) {
  
  
  controller.on('channelDeleted', function(bot, message) {

      console.log('A CHANNEL WAS REMOVED!');

  });

  controller.on('channelRenamed', function(bot, message) {

      console.log('A CHANNEL WAS RENAMED!');
      bot.replyInThread(message,'Cool new name for this channel.');
  
  });

  
  controller.on('channelCreated', function(bot, message) {


    // send a reply in the new channel
    bot.replyInThread(message,'welcome to this new channel');

    // also acknowledge it in general
    bot.reply(message,'hey a new channel just got created! see ya there.');


  });

  controller.on('bot_channel_join', function(bot, message) {
    
     controller.studio.run(bot, 'channel_join', message.user, message.channel, message);
    
//       bot.reply(message,'I HAVE ARRIVED!!!', function(err, res) {

//           if (err) {
//           console.log('ERROR IN REPLY', err);
//           } else {
//             console.log('REPLY SUCCESS', res);
//           }
//       });

  });

  controller.on('user_channel_join', function(bot, message) {
      bot.reply(message,'OH HELLO NEW MEMBER!', function(err, res) {

          if (err) {
          console.log('ERROR IN REPLY', err);
          } else {
            console.log('REPLY SUCCESS', res);
          }
      });

  });

  
}