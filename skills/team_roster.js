/*
    Demonstrate how the `getTeamRoster` and `getConversationMembers` API
    methods can be used to get a list of conversation participants
*/
module.exports = function(controller) {


  controller.hears('roster','direct_mention', function(bot, message) {

    bot.api.getTeamRoster(message.channel, function(err, roster) {
      if (err) {
        bot.reply(message,'Error loading roster: ' + err);
      } else {

        var list = [];
        for (var u = 0; u < roster.length; u++) {
          list.push(roster[u].name);
        }

        bot.reply(message,'Team roster: ' + list.join(', '));
      }
    });

  });


  controller.hears('members','direct_mention,direct_message', function(bot, message) {

    bot.api.getConversationMembers(message.channel, function(err, roster) {
      if (err) {
        bot.reply(message,'Error loading roster: ' + err);
      } else {

        var list = [];
        for (var u = 0; u < roster.length; u++) {
          list.push(roster[u].name);
        }

        bot.reply(message,'Conversation members: ' + list.join(', '));
      }
    });

  });


}
