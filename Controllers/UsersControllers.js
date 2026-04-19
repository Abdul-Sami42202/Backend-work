import Users from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

const getUsersController = async (req, res) => {
    //Users mongoose find
    console.log(req.query) // query params

    // let query = {}
    // if (req.query.ageStart && req.query.ageEnd) {
    //     const queryFlag = {...req.query}
    //     delete queryFlag.ageStart
    //     delete queryFlag.ageEn
    //     query = {...queryFlag, age: {$gte: req.query.ageStart, $lte: req.query.ageEnd}}
    // }

    let myQuery = {...req.query}

    delete myQuery.limit 
    delete myQuery.currentPage 
    delete myQuery.sort 

    let limit = req.query.limit ?? 10
    let page = req.query.currentPage - 1
    let sort = req.query.sort || "age";
    let users = []

    if (myQuery.search) {
        users = await Users.find({
            userName: myQuery.search
        }).limit(limit).skip(page * limit).sort(sort)
    } else {
        users = await Users.find().limit(limit).skip(page * limit).sort(sort)
    }

    res.json({
        status: true,
        message: "All users fetched successfully.",
        data: users
    })
}

const updateUsersController = async (req, res) => {
    try {
        const updateDetails = req.body
        console.log(updateDetails)
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        await Users.findByIdAndUpdate(decoded.id, updateDetails)

        res.json({
            status: true,
            message: "User field updated successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: false,
            message: error.message
        })
    }
}

export { getUsersController, updateUsersController }