var clone = require('clone');

module.exports = function(controller) {


  controller.hears(['poll'],['direct_mention'], function(bot, message) {
    
    var user = message.user_data;
    var original_channel = message.channel;
 
    // store these values so we can use them later
    var original_message = {
      channel: message.channel,
      original_message: clone(message.original_message),      
    }
    bot.startPrivateConversation(message, function(err, convo) {
      
      convo.ask('What is the topic of this poll?', function(res, convo) {
        convo.next();
      },{key: 'topic'});
      
      convo.ask('What should the first option in the poll be?', function(res, convo) {
        convo.gotoThread('next_question');
      },{key:'questions', multiple:true});

      convo.addQuestion('What is next option? Say DONE if there are no more.', [
          {
            pattern: 'done',
            callback: function(res, convo) {

              // we do not to record the 'done' response
              convo.responses['questions'].pop();

              convo.gotoThread('complete');
            }  
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.gotoThread('next_question');
            }
          }
        ],{key:'questions',multiple:true},'next_question');
      
      convo.addMessage('Your poll is ready','complete');
      
      convo.beforeThread('complete', function(convo, next) {
        
          var poll = {
            vote_channel: original_channel, // store info about where the voting is happening
            control_channel: convo.context.channel, // store info about where the controls got sent
            topic: convo.extractResponse('topic'), // topic for the poll
            options: convo.extractResponse('questions').split('\n'), // options 
            user: user.id, // owner of the poll
            id: controller.guid(), // semi-random unique id for the poll
            votes: [], // empty array to hold votes as they come in
          }

          // construct the actual poll message
          var poll_message = {
            text: '<@' + message.user + '> made a poll!',
            attachments: [
              {
              contentType: 'application/vnd.microsoft.card.hero',
              content: {
                title: poll.topic,
                buttons: []
              }
              }]
          }
          
          for (var o = 0; o < poll.options.length; o++) {
            poll_message.attachments[0].content.buttons.push({
              type: 'invoke',
              title: poll.options[o],
              value: JSON.stringify({
                action: 'poll_vote',
                user: user.id,
                poll: poll.id,
                vote: o,
              }),
            })
          }

          
          var control_message = {
            attachments: [
              controller.pollControlCard(poll)
            ]
          }
          
          // send the control card to the owner
          bot.reply(convo.source_message, control_message, function(err, controls) {
            
            console.log('err', err,'controls', controls);

            // store the .ts value so we can update this message later
            //poll.controls= controls.ts;
          
            // send the poll card to the public channel
            bot.replyInThread(original_message, poll_message, function(err, sent_msg) {
              
                          console.log('err', err,'sent_msg', sent_msg);


              // store the .ts value so we can update this message later
              //poll.sent = sent_msg.ts;

              // store poll in the database
              if (!user.polls) { user.polls = []; }
              user.polls.push(poll);
              controller.storage.users.save(user);

              next();

            });
          });
      });
    });    
  });
  
  
}