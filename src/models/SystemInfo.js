const mongoose = require('mongoose');

const SystemInfoSchema = mongoose.Schema({
}, { strict: false });

module.exports = mongoose.model('SystemInfo', SystemInfoSchema);
