const express = require('express');
const Article = require('../models/Article.js')
const router = new express.Router()
const auth = require('../middleware/auth.js')
const responseFormat = require('../helpers/responseFormat.js')

router.post('/api/users/:userId/articles', auth, async (req, res)=>{
    const article = new Article({...req.body, 
        author: req.params.userId})   
        let error = 'Failed to create Article'       
        let message = 'Request Unsuccessful'
        let data = null
    try{
        
        if(!(req.params.userId===req.user._id.toString())){
            error = 'Unauthorized'
            throw new Error('Unauthorized')
        }
        await article.save()

        console.log(!article)

        if(article){
            error = null
            message = 'Request successful'
            data = article
        }
        

        res.status(201).send(responseFormat(201,data,error,message))
    } catch(e) {
        res.status(400).send(responseFormat(400,data,error,message))
    } 
})

router.get('/api/articles', auth, async (req, res)=>{
    let error = 'Failed to fetch Articles'      
    let data = null
    try {
        const articles = await Article.find()
        data = articles
        error = null
        res.send(responseFormat(200,data,error,"Request Successful"))
    } catch (e) {
        res.status(400).send(responseFormat(400,data,error,"Request Unsuccessful"))
    }
    
    
})

module.exports = router