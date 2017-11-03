const repl = require('repl');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { url } = require('config/database');

dotenv.config();

require('../src');
mongoose.connect(url);

repl.start('helpme-api> ');
