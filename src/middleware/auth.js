const response = require('../helpers/standardResponse')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if(req.headers.authorization){
        const auth = req.headers.authorization.split(' ')
        const token = auth[1]

        try{
            const result = jwt.verify(token, process.env.APP_SECRET || 'secretKey')
            req.authResult = result
            next()
        }catch(err){
            return response(res, err.message, null, false, 400);
        }
    }
}

module.exports = auth