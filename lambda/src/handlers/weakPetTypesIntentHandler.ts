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
  getPetWithWeakAttackAgainst,
  getPetWithWeakDefenseAgainst
} from '../data';

export const WeakPetTypesIntentHandler : RequestHandler = {
  canHandle(handlerInput : HandlerInput) : boolean {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'WeakPetTypesIntent';
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

    const weakAttackPet = getPetWithWeakAttackAgainst(petType);
    const weakDefensePet = getPetWithWeakDefenseAgainst(petType);

    const speechText = `${weakDefensePet.name} has weak defense against ${petType}, and ${weakAttackPet.name} has weak attack against ${petType}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
