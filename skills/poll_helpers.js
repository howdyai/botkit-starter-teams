module.exports = function(controller) {
  
  
    function generateBar(num, total) {
      var length = 15;
      var char = '▇';
      var str = '';
      
      if (total == 0) {
        total = 1;
        num = 0;
      }
      
      for (var x = 0; x < Math.floor(length * (num/total)); x++) {
        str = str + char;
      }
  
      if (str.length > 0) {
         str = '`' + str + '` ';
      }
      
      str = str + Math.floor(100*(num/total)) + '% (' + num + ')';
      
      return str;
      
    }
  
    controller.guid = function guid() {
      function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
    }
  
    controller.pollResultsCard = function(poll) {
          
        var vote_count = poll.votes.length;

        var attachment = {
              contentType: 'application/vnd.microsoft.card.hero',
              content: {
                title: poll.topic,
                buttons: [],
                text: 'based on ' + vote_count + ' votes',
            }
        }

        var options = [];
        // count votes
        for (var o = 0; o < poll.options.length; o++) {
          options[o] = {
            title: poll.options[o],
            votes: 0,
          };
        }
        for (var v = 0; v < poll.votes.length; v++) {
          options[poll.votes[v].vote].votes++;
        }
      
        options = options.sort(function(a,b) {
          return b.votes - a.votes;
        });
          
        // for (var o = 0; o < poll.options.length; o++) {
        //   attachment.content.buttons.push({
        //     title: options[o].title,
        //     value: generateBar(options[o].votes,poll.votes.length),
        //   })
        // }
      
        return attachment;

    }
    
    controller.pollControlCard = function(poll) {
      var attachment = controller.pollResultsCard(poll);
      attachment.content.buttons = [
        {
          type: 'invoke',
          title: 'Close',
          value: JSON.stringify({
            action: 'poll_close',
            user: poll.user,
            poll: poll.id,
          })
        }];
      
        return attachment;
    }
      
}