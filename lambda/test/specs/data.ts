import { expect } from 'chai';
import {
  getPet,
  getPetWithStrongAttackAgainst,
  getPetWithStrongDefenseAgainst,
  getPetWithWeakAttackAgainst,
  getPetWithWeakDefenseAgainst
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

  it('should get strong defense pet', () => {
    const strongDefensePet = getPetWithStrongDefenseAgainst('elemental');
    expect(strongDefensePet).to.not.be.null;
    expect(strongDefensePet.name).to.equal('critter');
  });

  it('should get weak attack pet', () => {
    const weakAttackPet = getPetWithWeakAttackAgainst('aquatic');
    expect(weakAttackPet).to.not.be.null;
    expect(weakAttackPet.name).to.equal('undead');
  });

  it('should get weak defense pet', () => {
    const weakDefensePet = getPetWithWeakDefenseAgainst('aquatic');
    expect(weakDefensePet).to.not.be.null;
    expect(weakDefensePet.name).to.equal('elemental');
  });
});
