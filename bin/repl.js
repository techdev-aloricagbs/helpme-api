const repl = require('repl');
const dotenv = require('dotenv');

dotenv.config();

require('../src');

repl.start('helpme-api> ');
