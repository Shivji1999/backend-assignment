const express = require('express');
require('./db/database.js')
const userRouter = require('./routers/user.js')
const articleRouter = require('./routers/article.js')

const app = express();
const port = 3000

app.use(express.json());

app.use(userRouter)
app.use(articleRouter)

app.listen(port,()=>{
    console.log('Server started on port', port)
})