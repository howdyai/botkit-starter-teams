module.exports = function(controller) {



  controller.hears('channels','direct_mention', function(bot, message) {

    bot.api.getChannels(message.raw_message.channelData.team.id, function(err, roster) {
      if (err) {
        bot.reply(message,'Error loading channel list: ' + err);
      } else {

        var list = [];
        for (var u = 0; u < roster.length; u++) {
          list.push(bot.channelLink(roster[u]));
        }

        bot.reply(message,'Channels: ' + list.join(', '));
      }
    });

  });





}
