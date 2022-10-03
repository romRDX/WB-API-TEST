const personagens = require('../data/characters');

const myCharactersHandler = (resp) => {
    resp.json({ teste: personagens });
}

module.exports = myCharactersHandler;