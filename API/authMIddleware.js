const accessToken = require('./accessToken')

const authMiddleware = (req, res, next) => {
    const { authtoken } = req.headers;

    try {
        const user = accessToken.decodeAccessToken(authtoken);
        req.user = user; 
        next();
    } catch (error){
        res.status(401).json({message: 'Invalid credentials middleware'})
    }

    
}

module.exports = authMiddleware;