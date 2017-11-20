const path = require('app-module-path');
path.addPath(process.cwd());

process.setMaxListeners(0);

require('./observers');
