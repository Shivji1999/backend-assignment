const jwt = require('jsonwebtoken')
const User = require('../models/user')
const responseFormat = require('../helpers/responseFormat.js')

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'MYSECRET')
        const user = await User.findOne({_id: decoded._id})

        if(!user){
            throw new Error()
        }

        req.user = user
        next()
    }catch(e){
        const error = 'Please Authenticate'
        res.status(401).send(responseFormat(401,null,error,"Request Unsuccessful"))
    }
}

module.exports = auth