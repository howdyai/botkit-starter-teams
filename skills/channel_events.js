/*
    Demonstrate how to catch and take action based on changes to the
    channel list
*/
module.exports = function(controller) {

  controller.on('channelDeleted', function(bot, message) {

    console.log('A channel was deleted!');
    // do something like clean up any settings related to
    // this now deleted channel..

  });

  controller.on('channelRenamed', function(bot, message) {

    console.log('A channel was renamed!');
    // do something like update settings pertaining to
    // this channel's name

  });


  controller.on('channelCreated', function(bot, message) {

    // send a reply in the new channel
    bot.replyInThread(message, 'Welcome to this new channel!');

    // also acknowledge it in general
    bot.reply(message, 'A new channel just got created! See ya there.');

  });

}
