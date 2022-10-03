const tribes = require('../data/tribes');

const tribesHandler = (resp) => {
    resp.json({ tribes });
}

module.exports = tribesHandler;