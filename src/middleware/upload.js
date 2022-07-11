const upload = require('../helpers/upload').single('picture')
const response = require('../helpers/standardResponse')

const uploadFile = (req, res, next) => {
    upload(req, res, (err)=>{
        if(err) return response(res, err.message, null, false, 400);
        next();
    })
}

module.exports = uploadFile