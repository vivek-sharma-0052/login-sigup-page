const express = require('express')
require('dotenv').config()
const Connectdb = require('./Config/db')
const app = express()
Connectdb()
app.use(express.json())


const userRouter = require('./routes/userRouter')

app.use('/api/user', userRouter);
app.use('/api/product',)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})