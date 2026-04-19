const express = require('express');
const dotenv = require('dotenv');
const dns = require('node:dns');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/AuthRoutes');
const usersRoutes = require('./Routes/UsersRoutes');

dotenv.config()
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database is connected.")
}

app.get('/health', (req, res) => {
    res.json({
        status: true,
        message: "Backend is working properly."
    })
})

//Authentication
//Signup, login
app.use('/api/v1/auth', authRoutes)


//Users
//get, add, update, delete
app.use('/api/v1/users', usersRoutes)

app.use((err, req, res, next) => {
    res.status(400).json({
        status: false,
        error: err.message
    })
})

app.listen(port, (req, res) => {
    console.log("Server is running on port", port)
})