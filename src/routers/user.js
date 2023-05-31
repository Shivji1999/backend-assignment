const express = require('express');
const User = require('../models/user.js')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const responseFormat = require('../helpers/responseFormat.js')

router.post('/api/signup', async (req, res)=>{
    let data = null
    let error = 'Unable to Create User'
    let message = 'Request Unsuccessful'
    const user = new User(req.body);
    debugger
    try{
        await user.save()
        data = user
        error = null
        message = 'Request Successful'
        res.status(201).send(responseFormat(201,data,error,message))
    } catch(e) {
        res.status(400).send(responseFormat(400,data,error,message))
    }    
})

router.post('/api/login', async (req, res)=>{
    let data = null
    let error = 'User Not Found'
    let message = 'Request Unsuccessful'
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        if(!user){
            throw new Error()
        }
        const token = await user.generateAuthToken()
        data = {user, token}
        error = null
        message = 'Request Successful'
        res.send(responseFormat(200,data,error,message))
    }catch(e){
        res.status(400).send(responseFormat(400,data,error,message))
    }
    
})

router.patch('/api/users/:userId', auth, async (req, res)=>{
    let data = null
    let error = 'Unable to update User'
    let message = 'Request Unsuccessful'

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation) {
        error = 'Invalid Update'
        return res.status(400).send(responseFormat(400,data,error,message))
    }

    try{

        const user = await User.findById(req.params.userId)

        if(!user){
            error = 'User Not found'
            throw new Error()
        }

        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
        data = user
        error = null
        message = 'Request Successful'
        res.send(responseFormat(200,data,error,message))

    }catch(e){
        res.status(400).send(responseFormat(400,data,error,message))
    }

})

module.exports = router