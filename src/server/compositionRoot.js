const ComplaintsRepo = require('./complaintsRepo');
const ComplaintsLogic = require('./complaintsLogic');
const Logger = require('./logger');

const Bottle = require('bottlejs');

module.exports = {
  BuildContainer() {
    const bottle = new Bottle();
    bottle.service('Logger', Logger);
    bottle.service('ComplaintsRepo', ComplaintsRepo, 'Logger');
    bottle.service('ComplaintsLogic', ComplaintsLogic, 'ComplaintsRepo');
    global.container = bottle.container;
  },
};
