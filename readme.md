# This repo is deprecated!

To get a fresh Botkit starter kit, use the Yeoman generator or [remix a starter kit on Glitch](https://glitch.com/botkit)

```
npm install -g yo generator-botkit
yo botkit
```




# Botkit Starter Kit for Microsoft Teams Bots

This repo contains everything you need to get started building a [Microsoft Teams](https://products.office.com/en-us/microsoft-teams/group-chat-software) bot with [Botkit](https://botkit.ai/teams)

Botkit is designed to ease the process of designing and running useful, creative bots that live inside messaging platforms. Bots are applications that can send and receive messages, and in many cases, appear alongside their human counterparts as users.

Some bots talk like people, others silently work in the background, while others present interfaces much like modern mobile applications. Botkit gives developers the necessary tools for building bots of any kind! It provides an easy-to-understand interface for sending and receiving messages so that developers can focus on creating novel applications and experiences instead of dealing with API endpoints.

Our goal with Botkit is to make bot building easy, fun, and accessible to anyone with the desire to create a future filled with talking machines!

### What's Included

* [Botkit core](https://botkit.ai/docs/core.html) - a complete programming system for building conversational software
* [Botkit for Microsoft Teams](https://botkit.ai/docs/readme-teams.html) - extensions to Botkit to take advantage of Teams-specific features and APIs
* [Pre-configured Express.js webserver](https://expressjs.com/) including:
  * A customizable "Install my Bot" homepage
	* Webhook endpoints for communicating with platforms
* Sample skill modules that demonstrate various features of Botkit
* A sample "note taker" app that weaves together bot features, as well as:
  * A sample [static tab](https://msdn.microsoft.com/en-us/microsoft-teams/tabs)
  * A sample [configurable tab](https://msdn.microsoft.com/en-us/microsoft-teams/tabs) (along with sample settings pages)
  * A sample skill for responding to [Compose Extension](https://msdn.microsoft.com/en-us/microsoft-teams/composeextensions)queries

### Setup Botkit

[Remix this project on Glitch](https://glitch.com/~botkit-teams)

[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/howdyai/botkit-starter-teams/master)

Clone this repository using Git:

`git clone https://github.com/howdyai/botkit-starter-teams.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd botkit-starter-teams
npm install
```

#### Set up your Bot Framework profile and sideload your bot

To get everything up and running, you'll have to create an account and bot profile inside Microsoft's [Bot Framework](http://dev.botframework.com) tool.
You also need to create and "sideload" a application package. This is a multi-step process, but only takes a few minutes.

We have created a detailed step-by-step guide to setting up your bot for Teams in this [provisioning guide](https://botkit.ai/docs/provisioning/teams.html).

Now comes the fun part of [making your bot!](https://botkit.ai/docs/)

## Extend This Starter kit

This starter kit is designed to provide developers a robust starting point for building a custom bot. Included in the code are a set of sample bot "skills" that illustrate various aspects of the Botkit SDK features.  Once you are familiar with how Botkit works, you may safely delete all of the files in the `skills/` subfolder.

Developers will build custom features as modules that live in the `skills/` folder. The main bot application will automatically include any files placed there.

A skill module should be in the format:

```
module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

}
```


## Customize Storage
By default, the starter kit uses a simple file-system based storage mechanism to record information about the teams and users that interact with the bot. While this is fine for development, or use by a single team, most developers will want to customize the code to use a real database system.

There are [Botkit plugins for all the major database systems](https://botkit.ai/docs/readme-middlewares.html#storage-modules) which can be enabled with just a few lines of code.

We have enabled our [Mongo middleware]() for starters in this project. To use your own Mongo database, just fill out `MONGO_URI` in your `.env` file with the appropriate information. For tips on reading and writing to storage, [check out these medium posts](https://botkit.groovehq.com/knowledge_base/categories/build-a-bot)

# Developer & Support Community

You can find full documentation for Botkit on our [Docs site](https://botkit.ai/docs/).

###  Need more help?

* Join our thriving community of Botkit developers and bot enthusiasts at large. Over 4500 members strong, [our open teams group](http://community.botkit.ai) is _the place_ for people interested in the art and science of making bots.

 Come to ask questions, share your progress, and commune with your peers!

* We also host a [regular meetup and annual conference called TALKABOT.](http://talkabot.ai) Come meet and learn from other bot developers!

 [Full video of our 2016 event is available on Youtube.](https://www.youtube.com/playlist?list=PLD3JNfKLDs7WsEHSal2cfwG0Fex7A6aok)



# About Botkit

Botkit is a product of [Howdy](https://howdy.ai) and made in Austin, TX with the help of a worldwide community of botheads.
