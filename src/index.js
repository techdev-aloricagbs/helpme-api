process.setMaxListeners(0);
const path = require('app-module-path');

path.addPath(process.cwd());
path.addPath(`${process.cwd()}/src`);

require('./observers');
