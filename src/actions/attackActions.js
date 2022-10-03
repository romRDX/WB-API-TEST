
const attackAction = (attacker, receiver, attackData) => {

    const attackDamage = attacker.DMG + attackData.baseDamage;

    const defenseValue = receiver.DEF;

    return attackDamage - defenseValue;
}

module.exports = attackAction;