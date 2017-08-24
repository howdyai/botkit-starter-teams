module.exports = function(controller){
  
  controller.on('composeExtension', function(bot, message){
    
    var results = [];  
    if (message.user_data) {
      for (var n = 0; n < message.user_data.notes.length; n++) {

        var note = message.user_data.notes[n];
        var pattern = new RegExp('\\b' + message.text + '\\b','i');
        if (note.text.match(pattern)) {
          
          results.push({
              contentType: 'application/vnd.microsoft.card.hero',
              textFormat: 'markdown',
              content: {
                title: note.text,
              }
          })
        }
      }    
    }

    var card = {
      composeExtension:{
        type:"result",
        channelData:{},
        textFormat: 'markdown',
        attachmentLayout:"list",
        attachments: results,
      }
    }
    
    
    console.log('REPLYING TO COMPOSE EXTENSION', JSON.stringify(card,null,2));

    bot.replyToComposeExtension(message, card);

  });
  
  


}
