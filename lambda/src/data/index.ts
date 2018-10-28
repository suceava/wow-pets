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

export interface PetData {
  [key: string]: Pet
};

export const petData: PetData = data as PetData;
export const petArray: Array<Pet> = R.props(R.keys(data), data);

export const getPet = (petType: string): Pet => {
  return petData[petType];
};

// does the pet have a strong attack against the petType?
const hasStrongAttackAgainst = (petType: string, pet: Pet): boolean => {
  return pet.strongAttack === petType;
};
// does the pet have a strong defense against the petType?
const hasStrongDefenseAgainst = (petType: string, pet: Pet): boolean => {
  return pet.strongDefense === petType;
};

// get the pet that has a strong attack against the petType
export const getPetWithStrongAttackAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasStrongAttackAgainst)(petType), petArray);
};

// get the pet that has a strong defense against the petType
export const getPetWithStrongDefenseAgainst = (petType: string): Pet => {
  return R.find(R.curry(hasStrongDefenseAgainst)(petType), petArray);
};


