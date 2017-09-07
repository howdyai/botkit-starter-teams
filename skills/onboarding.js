/*
    This skill implements an onboarding experience that is triggered
    when the bot is first added to Teams.  Botkit listens for the
    `bot_channel_join` event, then loads and performs the onboarding
    script from Botkit Studio
*/
module.exports = function(controller) {


    controller.on('bot_channel_join', function(bot, message) {

        // use botkit studio to send an onboarding message
       controller.studio.run(bot, 'onboarding', message.user, message.channel, message);

    });

}
