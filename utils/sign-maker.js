const Crypto = require('crypto');


class SignMaker {
    constructor(token) {
        this.token = token;
    }

    make(path, timestamp, params) {
        let arr = [];
        for (let name in params) {
            let value = params[name];
            arr.push(name + '=' + value);
        }
        arr.sort();
        let str = path + '#' + arr.join('&') + '#' + timestamp;
        let sign = Crypto.createHmac("sha1", this.token).update(str).digest('hex');
        console.log(str,sign);
        return sign;
    }
}

module.exports = SignMaker;