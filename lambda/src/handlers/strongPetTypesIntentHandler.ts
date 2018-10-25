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

export const StrongPetTypesIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StrongPetTypesIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
//    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.Item;
    let itemName = 'test';
    // if (itemSlot && itemSlot.value) {
    //   itemName = itemSlot.value.toLowerCase();
    // }
    
    const speechText = `They are STRONG them ${itemName}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
