const jwt = require('jsonwebtoken');


const secretKey = 'The_W0UND_is_where_the_LIGHT_enters_you';

exports.createAccessToken = user => jwt.sign({id:user.id, name:user.name, email:user.email}, secretKey);


exports.decodeAccessToken = (accessToken) => jwt.verify(accessToken, secretKey);
