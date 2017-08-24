module.exports = function(controller) {

    // create special handlers for certain actions in buttons
    // if the button action is 'action', trigger an event
    // if the button action is 'say', act as if user said that thing
    controller.on('invoke', function(bot, trigger) {
      console.log('RESPONDING TO TRIGGER');
        if (trigger.value.action == 'poll_vote') {

          // get value of the button which contains the vote value
          var vote_info = trigger.value;

            console.log('LOAD: ', vote_info.user);
          controller.storage.users.get(vote_info.user, function(err, user) {
              console.log('GOT USER', err, user);
            
              var poll = user.polls.filter(function(p) { return (p.id == vote_info.poll)});

              poll = poll[0];
            
              if (!poll.votes) {
                poll.votes = [];
              }
              
              if (poll.closed) {
                return;
              }
            
              for (var v = 0; v < poll.votes.length; v++) {
                if (poll.votes[v].user == trigger.user) {
                  // already voted, just do nothing
                  return;
                }
              }
            
              poll.votes.push({
                user: trigger.user,
                vote: vote_info.vote,
              });
              
              // update user record
              for (var p = 0; p < user.polls.lenth; p++) {
                if (user.polls[p].id == poll.id) {
                  user.polls[p] = poll;
                }
              }                
                controller.storage.users.save(user);
            
                console.log('trigger object', trigger);
                var reply = trigger.original_message;

            
                if (reply.attachments.length > 1) {
                  // get rid of the second attachment
                  reply.attachments.pop();
                }                          
            
                reply.attachments.push({
                  text: 'Voted: ' + poll.votes.map(function(a) { return '<@' + a.user + '>' }).join(', '), 
                })
            
                // cause the poll message to be updated with the latest version
                bot.replyInteractive(trigger, reply);

                // update the owner's controls with latest results
                var updated_control = {
                  attachments: [
                    controller.pollControlCard(poll)
                  ],
                  ts: poll.controls,
                  channel: poll.control_channel,
                }
                
                bot.api.chat.update(updated_control, function(err, res) {
                  console.log('CHAT UPDATE RESULTS', err, res);
                });
            
          });
          
        }
    });


}
