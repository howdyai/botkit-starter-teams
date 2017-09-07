/*
    Sample handler for the composeExtension event, which triggers
    whenever a user activates the compose extension configured in
    this app.

    This sample uses notes captured by the `note_taking.js` skill
    and allows a user to search their notes and share them in a
    channel.

*/
module.exports = function(controller){

  controller.on('composeExtension', function(bot, message){

    var results = [];
    if (message.user_data) {
      for (var n = 0; n < message.user_data.notes.length; n++) {

        var note = message.user_data.notes[n];
        var pattern = new RegExp('\\b' + message.text + '\\b','i');
        if (note.text.match(pattern)) {

          results.push(bot.createHero(note.text))
        }
      }
    }

    bot.replyToComposeExtension(message, results);

  });


}
