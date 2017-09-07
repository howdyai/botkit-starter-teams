/*
    This is a sample Botkit Studio plugin module that implements
    a simple note taking behavior.

    Users can say "add note" or "note: my note" and create a
    sharable note inside Teams.  These notes will appear on the
    included sample tab application, and be accessible via the
    included `composeExtension.js` handler

    This skill requires a script called 'add note' to be present
    in Botkit Studio. An importable version of this script is
    present in the studio_scripts/ folder of this project!

*/

module.exports = function(controller) {

  controller.studio.before('add note', function(convo, next) {

    // can we extract the note out of the original message?
    var original_text = convo.source_message.text;

    var matches = original_text.match(/note\:(.*)/im);

    if (matches && matches[1]) {
      var note = {
        text: matches[1].trim(),
        user: convo.context.user,
        channel: convo.context.channel,
        author: convo.source_message.original_message.user_profile.name,
        id: controller.guid(),
      }

      if (note.text) {
        convo.setVar('note', note);
        convo.gotoThread('note_created');
      }
    }

    // after 30 seconds of inactivity, time out (and save the note)
    convo.setTimeout(30000);

    next();

  });


  controller.studio.validate('add note', 'note_text', function(convo, next) {

       var note = {
        text: convo.extractResponse('note_text').trim(),
        user: convo.context.user,
        channel: convo.context.channel,
        author: convo.source_message.original_message.user_profile.name,
        id: controller.guid(),
      }

      if (note.text) {
        convo.setVar('note', note);
      }

    next();

  });

  controller.studio.beforeThread('add note', 'note_created', function(convo, next) {

    // pull the note back out of the conversation variables
    var note = convo.vars.note;
    addNoteForUser(note, convo.source_message).then(function() {
      next();
    }).catch(function(err) {
      convo.setVar('error', err);
      convo.gotoThread('error');
      next();
    });

  });

  controller.studio.beforeThread('add note', 'on_timeout', function(convo, next) {

    // if a note has already been started, let's save it before timing out
    if (convo.vars.note) {
      convo.gotoThread('note_created');
    }
    next();
  });



  function addNoteForUser(note, context) {

    return new Promise(function(resolve, reject) {
        if (!context.original_message.user_data.notes) {
          context.original_message.user_data.notes = [];
        }

        // format line breaks for markdown
        note.text = note.text.replace(/\n/gim,'\n\n');
        note.time = new Date();

        context.original_message.user_data.notes.push(note);
        context.original_message.channel_data.notes.push(note);

        controller.storage.channels.save(context.original_message.channel_data, function(err) {
          if (err) {
            reject(err);
          } else {
            controller.storage.users.save(context.original_message.user_data, function(err) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
            });
          }
        });
      });

  }

}
