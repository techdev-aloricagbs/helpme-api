const repl = require('repl');


const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('../src');
const { url } = require('config/database');

dotenv.config();


mongoose.connect(url);

repl.start('helpme-api> ');
