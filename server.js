//Express server setup
const express = require("express");
const cors = require('cors');

//routes
const signUp = require("./controllers/signUp");
const signIn = require("./controllers/signIn");
const searchUser = require("./controllers/searchUser");
const imageCounter = require("./controllers/imageCounter");
//knex
const knex = require('knex')({
     client: 'pg',
     connection: {
       host : '127.0.0.1',
       user : 'tareq',
       password : 'pass',
       database : 'face_detection'
     }
   });

const app = express();

//node.bcrypt.js setup:
const bcrypt = require("bcrypt");
const saltRounds = 10;

//express middlwares
app.use(express.json());
app.use(cors());

// users query
app.get("/", (req, res) => { res.send("It is working!") });

//endpoints:
//user sign-up
app.post("/profile/signup", signUp.handleSignUp(knex, bcrypt, saltRounds));

//user sign-in
app.post("/profile/signin", signIn.signInHandler(knex, bcrypt));

//user inquery by id

app.get("/profile/:id", searchUser.serachHandler(knex));

//image => PUT => user counter+1
app.put("/image", imageCounter.counterHandler(knex));
app.post("/imageurl", (req, res) => { imageCounter.handleApiCall(req, res) });

//update user info
app.put("/profile/:id", (req, res) => {
     const { id } = req.params;
     let user = database.users.filter(user => {
          return user.id === id;
     })[0];

     const index = database.users.indexOf(user);
     const keys = Object.keys(req.body);
     keys.map(key => {
          user[key] = req.body[key];
     });

     database.users[index] = user;
     res.json(database.users[index]);
     res.status(400).json("Edit user failed!");
});

//delete user
app.delete("/profile/:id",(req, res) => {

     const { id } = req.params;
     
     let user = database.users.filter(user => {
          return user.id === id;
     })[0];

          const index = database.users.indexOf(user);
          database.users.splice(index, 1);       
          res.json({message: `User ${id} deleted.`});
          res.status(400).json("Error deleting user");
     });

app.listen(process.env.PORT || 4000, () => {
     console.log(`server listening on port: ${process.env.PORT}`);
});

//bash
//PORT=4000 node server.js
