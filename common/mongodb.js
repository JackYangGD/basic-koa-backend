const mongoist = require('mongoist');
const conf = require('../conf/db');
const db = mongoist(conf.url, conf.ops);
module.exports = db;
global.ObjectId = mongoist.ObjectId;