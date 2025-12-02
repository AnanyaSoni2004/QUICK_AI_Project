// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Creating App
// const app = express();

// // Creating Prisma instance
// const prisma = new PrismaClient();

// // Middleware to parse JSON requests
// app.use(express.json());

// // Define routes
// app.get('/', (req, res) => {
//     res.status(200).send("Hello World!!");
// });

// app.post('/signup', async (req, res) => {
//     //write your code here
//     const {username, email, password} = req.body;

//     if(!username || !username.trim() || !email || !email.trim() || !password || !password.trim()){
//         return res.status(400).json({
//             "error" : "All fields are required"
//         })
//     }

//     const duplicate = await prisma.user.findFirst({
//         where : {
//             OR : [
//                 {username},
//                 {email}
//             ]
//         }
//     })
//     if(duplicate){
//         return res.status(400).json({
//             "error" : "Username or email already exists"
//         })
//     }
//     await prisma.user.create({
//         data : {
//             username,
//             email,
//             password
//         }
//     })
//     res.status(201).json({
//         "message" : "Signup successful!",
//         "user" : {
//             "username" : username,
//             "email" : email
//         }
//     })
// });

// app.post('/login', async (req, res) => {
//     //write your code here
//     const {username, email, password} = req.body;
//     if(!password || !password.trim()){
//         return res.status(400).json({
//             "error" : "All fields are required"
//         })
//     }

//     const present = await prisma.user.findFirst({
//         where : {
//             OR : [
//                 {username},
//                 {email}
//             ]
//         }
//     })
//     console.log(present)
//     if(!present){
//         return res.status(401).json({
//             "message" : "Invalid credentials"
//         })
//     }

//     if(present.password != password){
//         return res.status(401).json({
//             "message" : "Invalid credentials"
//         })
//     }
//     let name = present.username
//     let mail = present.email
//     return res.json({
//         "message" : "Login successful!",
//         "userData" : {
//             "username" : name ,
//             "email" : mail
//         }
//     })
// });

// // Set the port from environment variable or default to 3000
// const port = process.env.PORT || 3000;

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// // Export app and prisma instances
// module.exports = { app, prisma };


