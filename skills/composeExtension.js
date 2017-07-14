module.exports = function(controller){
  controller.on('composeExtension', function(bot, message){
    console.log('-----------------------------------------------------------------');
    console.log('composeExtension message:', message);
    var card = {
      composeExtension:{
        type:"result",
        channelData:{},
        attachmentLayout:"list",
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.hero',
            content: {
              title: 'Hero card',
              subtitle: 'Subtitle of hero card',
              text: 'This is the text',
              images: [
                {
                  url: 'http://placekitten.com/1600/900',
                  alt: 'a kitten',
                  tap: {
                    type: 'invoke',
                    title: 'picture click',
                    value: JSON.stringify({'foo':'bar'}),
                  }
                }
              ],
              buttons: [
                {
                  title: 'Drink me',
                  type: 'invoke',
                  value: JSON.stringify({'foo':'bar'}),
                },
                {
                  title: 'Drink me',
                  type: 'imBack',
                  value: 'I CLICK A BUTTON',
                },
                {
                  title: 'Open Url',
                  type: 'openUrl',
                  value: 'https://botkit.ai',
                },
              ]
            }
          }
        ]
      }
    }

    bot.replyToComposeExtension(message, card);

  });



}
