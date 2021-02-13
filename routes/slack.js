const express = require('express');
const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const { createMessageAdapter } = require('@slack/interactive-messages');

const SessionService = require('../services/SessionService');

const { questions } = require('../questions');
let question = 0;

const config = require('../config');

const router = express.Router();

const slackEvents = createEventAdapter(config.slack.signingSecret);
const slackWebClient = new WebClient(config.slack.token);
const slackInteractions = createMessageAdapter(config.slack.signingSecret);
const sessionService = new SessionService();

const createSession = (channel, user, ts) => {
  return `${channel}-${user}-${ts}`;
}

const handleMention = async (event) => {
  // question
  const sessionId = createSession(event.channel, event.user, event.thread_ts || event.ts);
  // console.log(event.user);

  // slackEvents.on('message', handleMessage);

  let session = sessionService.get(sessionId);
  if (!session) {
    session = sessionService.create(sessionId);
    session.context = {
      slack: {
        channel: event.channel,
        user: event.user,
        thread_ts: event.thread_ts || event.ts,
      }
    };
  }

  return slackWebClient.chat.postMessage({
    text: 'Welcome, How are you doing?',
    channel: session.context.slack.channel,
    thread_ts: session.context.slack.thread_ts,
    username: 'Hello Bot',
    blocks: questions[question].blocks
  });
}

const handleInteractiveMessage = async (payload, respond) => {
  
  // console.log(payload);

  if(question == questions.length){
    respond({text: "Thank you", replace_original: false});
  }
}

const handleMessage = async (event) => {
  // question++
  // console.log(event);
  const mention = /<@[A-Z0-9]+>/;
  const eventText = event.text.replace(mention, '').trim();


  if (eventText != "" || event.subtype != "bot_message" || event.subtype != "app_mention" && question < questions.length) {
    question++

    const sessionId = createSession(event.channel, event.user, event.thread_ts || event.ts);

      let session = sessionService.get(sessionId);
      if (!session) {
        session = sessionService.create(sessionId);
        session.context = {
          slack: {
            channel: event.channel,
            user: event.user,
            thread_ts: event.thread_ts || event.ts,
          }
        };
      }
      return slackWebClient.chat.postMessage({
        text: 'Welcome, How are you doing?',
        channel: session.context.slack.channel,
        thread_ts: session.context.slack.thread_ts,
        username: 'Techy',
        blocks: questions[question].blocks
      });
    
  }
}

module.exports = () => {

  console.log(config.slack.token);

  router.use('/actions', slackInteractions.requestListener());
  router.use('/events', slackEvents.requestListener());

  slackEvents.on('app_mention', handleMention);
  
  slackEvents.on('error', (error) => {
    console.log(error.name); // TypeError
  });
  slackInteractions.action({ type: 'multi_static_select' }, handleInteractiveMessage);
  slackInteractions.action({ type: 'static_select' }, handleInteractiveMessage);
  // slackEvents.on('block_actions', (payload) => console.log('hello'));
  // slackInteractions.action({type: 'message_action'}, async (payload, respond) => {
  //   console.log(payload);
  // });

  return router;
};

