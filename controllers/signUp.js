const signUp = (knex, bcrypt, saltRounds) => (req, res) => {
     const { name, email, password } = req.body;
     if( !email || !name || !password) {
        return res.status(400).json("Incorrect form sumbmittion");
     }
     const hash = bcrypt.hashSync(password, saltRounds)
     console.log(password);
     //create a transaction when we have to do more than 2 things at once:
     knex.transaction(trx => {  //trx to perform transactions
        
          trx.insert({
               hash: hash,
               email: email,
          })
         .into("login")
          .returning("email")
          .then(loginEmail => {
               return trx("users")
               .returning("*")
               .insert({
                    name: name,
                    email: loginEmail[0],
                    entries: 0,
                    joined: new Date()
          })
          .then(user => {
                res.json(user[0]);
          })      
          })  
          .then(trx.commit)    //commit to make sure all the above are added.
          .catch(trx.rollback) //in case anything failed
     })
          .catch(err => res.status(400).json("Error signing up!" + err));   
};

module.exports = {
     handleSignUp: signUp
}