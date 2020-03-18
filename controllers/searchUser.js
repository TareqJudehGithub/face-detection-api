const searchUser = (knex) => (req, res) => {
     const { id } = req.params;

     knex.select("*").from("users")
     .where({id: id})
     .then(user => {
          user.length
          ?
          res.json(user[0])
          :
          res.status(400).json("User not found!")
     })
     .catch(err => res.status(400).json("Error in searching user!"));
};

module.exports = {
     serachHandler: searchUser
};