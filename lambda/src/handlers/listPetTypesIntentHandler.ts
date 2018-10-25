import {
  HandlerInput,
  RequestHandler
} from 'ask-sdk-core';
import {
  Response
} from 'ask-sdk-model';
import {
  SKILL_NAME
} from '../constants';

export const ListPetTypesIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ListPetTypesIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
    const speechText = 'There are 10 types of battle pets';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
