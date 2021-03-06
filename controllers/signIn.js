const signIn = (knex, bcrypt) => (req, res) => {
     
     knex.select("email", "hash").from("login")
     .where("email", "=", req.body.email)
     .then(data => {
          const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
               
          if (isValid) {
               return knex.select("*").from("users")
               .where("email", "=", req.body.email)
          .then(user => {
               res.json(user[0])
          })
          .catch(err => res.status(400).json("Unable to get user."))
          }  
          res.status(400).json("Invalid username/password."); 
     })
     .catch(err => res.status(400).json("Code error!"));
};

module.exports = {
     signInHandler: signIn
};