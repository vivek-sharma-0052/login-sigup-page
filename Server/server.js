const express = require('express')
require('dotenv').config()
const Connectdb = require('./Config/db')
const cors  = require('cors')


const app = express()
app.use(cors())
Connectdb()
app.use(express.json())


const userRouter = require('./routes/userRouter')

app.use('/api/user', userRouter);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} `)
})