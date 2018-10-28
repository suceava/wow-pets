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
  getPetWithStrongAttackAgainst,
  getPetWithStrongDefenseAgainst
} from '../data';

export const StrongPetTypesIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'StrongPetTypesIntent';
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
    
    const strongAttackPet = getPetWithStrongAttackAgainst(petType);
    const strongDefensePet = getPetWithStrongDefenseAgainst(petType);

    const speechText = `${strongAttackPet.name} has strong attack against ${petType}, and ${strongDefensePet.name} has strong defense against ${petType}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
