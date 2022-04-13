const jwt = require('jsonwebtoken');

const authorize = (request, response, next) => {
    const jwtString = request.headers['api-token'];
    const secretOrPublicKey = 'b2a576c877f184c723057b1237096cde4498c1bf2990a244002b171209dfcb27';

    jwt.verify(jwtString, secretOrPublicKey, {}, (err, payload) => {
        if (err) {
            console.log(payload);
            response.statusMessage = "Not authorized";
            return response.status(401).end();
        } else {
            next();
        }
    });
}

module.exports = authorize;
