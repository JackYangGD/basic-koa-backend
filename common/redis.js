'use strict';
const config = require('../config');
const Redis = require('ioredis');
const redis = new Redis(config.redis);

exports.set = async(key, value) => {
    try {
        redis.set(key, value);
    } catch (e) {
        throw e;
    }
};

exports.get = async(key) => {
    return await new Promise(function (res, rej) {
        redis.get(key, function (err, result) {
            if (err) {
                rej(err);
            } else {
                res(result)
            }
        });
    })
};