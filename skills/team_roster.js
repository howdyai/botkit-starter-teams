module.exports = function(controller) {
  
  
    
  controller.hears('roster','direct_mention', function(bot, message) {
   
    bot.api.getTeamRoster(message.original_message.serviceUrl,message.original_message.channelData.team.id, function(err, roster) {
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
   
    bot.api.getConversationMembers(message.original_message.serviceUrl,message.original_message.conversation.id, function(err, roster) {
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