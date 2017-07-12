'use strict';
var Alexa = require('alexa-sdk');
var request = require('request');

var APP_ID = "amzn1.ask.skill.849e465b-4227-481e-b5ac-8ccce18b7db5";

var SKILL_NAME = "Number Tales";
var GET_NUMBER_TALE = "Here's your fun tale on numbers: ";
var HELP_MESSAGE = "You can say tell me a tale, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye!";

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewTaleIntent');
    },
    'GetNewTaleIntent': function () {
        var scope = this;
        request('http://numbersapi.com/random/trivia?json', function(error, response, body){
            var response = JSON.parse(body);
            var factText = response.text;
            var speechOutput = GET_NUMBER_TALE + factText;
            scope.emit(':tellWithCard', speechOutput, SKILL_NAME, factText)
        })
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};