import express from 'express';
import dotenv from 'dotenv';
import dns from 'node:dns';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './Routes/AuthRoutes.js';
import usersRoutes from './Routes/UsersRoutes.js';
// const serverless = require('serverless-http')


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

// if (process.env.ENVIRONMENT !== "production") {
    app.listen(port, (req, res) => {
        console.log("Server is running on port", port)
    })
// }

// Export the app for serverless deployment
// export default app