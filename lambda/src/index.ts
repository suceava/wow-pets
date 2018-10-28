import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
} from 'ask-sdk-core';
import {
  Response,
  SessionEndedRequest,
} from 'ask-sdk-model';
import {
  SKILL_NAME
} from './constants';
import { ListPetTypesIntentHandler } from './handlers/listPetTypesIntentHandler';
import { StrongPetTypesIntentHandler } from './handlers/strongPetTypesIntentHandler';
import { WeakPetTypesIntentHandler } from './handlers/weakPetTypesIntentHandler';

const LaunchRequestHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput : HandlerInput) : Response {
    const speechText = 'Welcome to WoW Pets';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};


const HelpIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
    const speechText = 'I can help';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput : HandlerInput) : Response {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput : HandlerInput) : Response {
    console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler : ErrorHandler = {
  canHandle(handlerInput : HandlerInput, error : Error ) : boolean {
    return true;
  },
  handle(handlerInput : HandlerInput, error : Error) : Response {
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I can\'t understand the command. Please say again.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};


/* LAMBDA SETUP */
let skill;
export const handler = async (event, context) => {
  if (!skill) {
    skill = SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        ListPetTypesIntentHandler,
        StrongPetTypesIntentHandler,
        WeakPetTypesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
      )
      .addErrorHandlers(ErrorHandler)
      .create();
  };

  const response = await skill.invoke(event, context);

  return response;
};
