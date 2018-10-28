import {
  HandlerInput,
  RequestHandler
} from 'ask-sdk-core';
import {
  IntentRequest,
  Response
} from 'ask-sdk-model';
import {
  SKILL_NAME,
  SlotType
} from '../constants';
import {
  getPet
} from '../data';

export const DescribePetTypeIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DescribePetTypeIntent';
  },
  handle(handlerInput : HandlerInput) : Response {
    // get petFamily slot
    const slot = (handlerInput.requestEnvelope.request as IntentRequest).intent.slots[SlotType.PET_FAMILY];
    let petType;
    if (slot && slot.value) {
      petType = slot.value.toLowerCase();
    } else {
      // slot not found => go to help
    }

    const pet = getPet(petType);
    const speechText = `The ${petType} pet type special is: ${pet.special}.` +
      ` They have strong attack against ${pet.strongAttack}.` +
      ` They have strong defense against ${pet.strongDefense}.` +
      ` They have weak attack against ${pet.weakAttack}.` +
      ` They have weak defense against ${pet.weakDefense}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
