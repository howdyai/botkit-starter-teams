module.exports = function(controller) {

  
  // this module pre-loads information about the user for each message that comes in.
  controller.middleware.receive.use(function(bot, message, next) {
    
      // loading user info requires a conversation be present
      if (message.channel) {

        // use the teams API to load the user's profile
        // which gives us their userPrincipalName which can be used to identify them 
        // within teams, but also in teams tab applications
        
        console.log('Loading user data for ', message.channel, message.user);
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
              message.user_data = user_data || { id: message.user_profile.userPrincipalName, notes: [] };              

              // remove the conversation indicator so we get the 
              var channel_id = message.channel.replace(/\;.*/,'');
              controller.storage.channels.get(channel_id, function(err, channel_data) {
                message.channel_data = channel_data || {id: channel_id, notes: []};
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