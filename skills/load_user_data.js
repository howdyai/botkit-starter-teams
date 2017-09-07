/*
  This module provides a middleware function that pre-loads information
  about the user for each message that comes in. This information is used
  by the `note_taking.js` sample skill.

  Note that this skill translates the user ID into a more universal
  `upn` before loading the data - this allows data stored this way to
  be accessible by both bot skills and tab applications.

*/
module.exports = function(controller) {


  controller.middleware.receive.use(function(bot, message, next) {

    // loading user info requires a conversation be present
    if (message.channel) {

      // use the teams API to load the user's profile
      // which gives us their userPrincipalName which can be used to identify them
      // within teams, but also in teams tab applications

      bot.api.getUserById(message.channel, message.user, function(err, user_profile) {
        if (err) {
          console.error('Error loading user profile info: ', err);
          next();
        } else {

          // add the user profile information to the mssage object. this can be handy!
          message.user_profile = user_profile;

          // use the storage system to load the user's record out of the database
          controller.storage.users.get(message.user_profile.userPrincipalName, function(err, user_data) {

            // now add the user data to the message object
            // if one does not exist, add in an empty object ready to use
            message.user_data = user_data || {
              id: message.user_profile.userPrincipalName,
              notes: []
            };

            // remove the conversation indicator so we get the
            var channel_id = message.channel.replace(/\;.*/, '');
            controller.storage.channels.get(channel_id, function(err, channel_data) {
              message.channel_data = channel_data || {
                id: channel_id,
                notes: []
              };
              next();
            });
          })
        }
      });
    } else {
      next();
    }

  });


}
