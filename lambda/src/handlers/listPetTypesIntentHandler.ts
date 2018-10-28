import {
  HandlerInput,
  RequestHandler
} from 'ask-sdk-core';
import {
  Response
} from 'ask-sdk-model';
import * as R from 'ramda';
import {
  SKILL_NAME
} from '../constants';
import {
  getPets
} from '../data';

export const ListPetTypesIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ListPetTypesIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
    const petArray = getPets();
    const petNames = R.join(',', R.map((pet) => pet.name, petArray));

    const speechText = `There are ${petArray.length} types of battle pets: ${petNames}.` +
      ` Ask me to describe a specific pet type for more information.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
