import { expect } from 'chai';
import {
  getPet,
  getPetWithStrongAttackAgainst,
  getPetWithStrongDefenseAgainst
} from '../../src/data';

describe('Data', () => {
  it('should get pet by type', () => {
    const pet = getPet('elemental');
    expect(pet).to.not.be.null;
    expect(pet.name).to.equal('elemental');
  });

  it('should get strong attack pet', () => {
    const strongAttackPet = getPetWithStrongAttackAgainst('elemental');
    expect(strongAttackPet).to.not.be.null;
    expect(strongAttackPet.name).to.equal('aquatic');
  });

  it('should get strong attack pet', () => {
    const strongDefensePet = getPetWithStrongDefenseAgainst('elemental');
    expect(strongDefensePet).to.not.be.null;
    expect(strongDefensePet.name).to.equal('critter');
  });
});
