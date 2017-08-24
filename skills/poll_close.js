module.exports = function(controller) {

  
  
    // create special handlers for certain actions in buttons
    // if the button action is 'action', trigger an event
    // if the button action is 'say', act as if user said that thing
    controller.on('invoke', function(bot, trigger) {
        if (trigger.value.action == 'poll_close') {

          // get value of the button which contains the vote value
          var vote_info = trigger.value;

          controller.storage.users.get(vote_info.user, function(err, user) {

            // mark the poll as closed and update the database
            var poll = user.polls.filter(function(p) { return (p.id == vote_info.poll)});

              poll = poll[0];
            
              poll.closed = true;
            
              // update user record
              for (var p = 0; p < user.polls.lenth; p++) {
                if (user.polls[p].id == poll.id) {
                  user.polls[p] = poll;
                }
              }                
                controller.storage.users.save(user);
            
  
              // construct the message that will contain the final results
              var results = {
                text: 'Poll closed!',
                attachments: [
                ]
              }
              
              results.attachments.push(controller.pollResultsCard(poll));
              
              // send the poll results back into the channel where it was conducted
              bot.reply({channel: poll.vote_channel}, results);
            
          });
          
        }
    });


}
