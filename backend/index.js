const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const User = require('./models/User')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("connected to MongoDB"))
.catch((err)=>console.error(`Error connecting to MongoDB: ${err}`))

// app.post("/register", async (req, res) => {
//     try{
//         const {name, email, password, role} = req.body

//         const newUser = new User({name, email, password, role})

//         await newUser.save()
//         res.status(201).json({ 
//             message: "User registered successfully" 
//         })
//     } catch (error) {
//         console.error(`Error registering user: ${error}`)
//         res.status(500).json({
//              message: "Internal server error" 
//         })
//     }
// })

// Import routes
const authRoutes = require('./routes/authRoutes')

// Use routes
app.use('/api/auth', authRoutes)

const testRoutes = require('./routes/testRoutes')
app.use('/api/test', testRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})