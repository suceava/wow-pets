import * as R from 'ramda';
import * as data from './data.json';

const R__ = (R as any).__;

export interface Pet {
  name: string;
  special: string;
  strongAttack: string;
  strongDefense: string;
  weakAttack: string;
  weakDefense: string;
};

interface PetData {
  [key: string]: Pet
};

const petData: PetData = data as PetData;
const petArray: Array<Pet> = R.props(R.keys(data), data);

export const getPet = (petType: string): Pet => {
  return petData[petType];
};

export const getPets = (): Array<Pet> => {
  return petArray;
}

// does the pet have a strong attack against the petType?
const hasStrongAttackAgainst = (petType: string, pet: Pet): boolean => {
  return pet.strongAttack === petType;
};
// does the pet have a strong defense against the petType?
const hasStrongDefenseAgainst = (petType: string, pet: Pet): boolean => {
  return pet.strongDefense === petType;
};
// does the pet have a weak attack against the petType?
const hasWeakAttackAgainst = (petType: string, pet: Pet): boolean => {
  return pet.weakAttack === petType;
};
// does the pet have a weak defense against the petType?
const hasWeakDefenseAgainst = (petType: string, pet: Pet): boolean => {
  return pet.weakDefense === petType;
};

// get the pet that has a strong attack against the petType
export const getPetWithStrongAttackAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasStrongAttackAgainst)(petType), petArray);
};

// get the pet that has a strong defense against the petType
export const getPetWithStrongDefenseAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasStrongDefenseAgainst)(petType), petArray);
};

// get the pet that has a weak attack against the petType
export const getPetWithWeakAttackAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasWeakAttackAgainst)(petType), petArray);
};

// get the pet that has a weak defense against the petType
export const getPetWithWeakDefenseAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasWeakDefenseAgainst)(petType), petArray);
};
