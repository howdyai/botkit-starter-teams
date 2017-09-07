/*
    Demonstrate how to receive an button click event,
    which trigger the "invoke" handler
*/
module.exports = function(controller) {

  controller.on('invoke', function(bot, message) {

    console.log('A button was clicked with the payload:', message.value);

  });



}
