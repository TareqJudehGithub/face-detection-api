const Clarifai = require("clarifai");

const app = new Clarifai.App({
     apiKey: "7d585dcb38dd43c6bdc72efb2b8bc84d"
    });
    const handleApiCall = (req, res) => {
     app.models
     .predict(
       Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
            res.json(data);
            console.log(data);
       })
       .catch(err => res.status(400).json("unable to fetch API."));
    };
   
const imageCounter = (knex) => (req, res) => {
     const { id } = req.body;
     knex("users").where("id", "=", id)
     .increment("entries", 1)
     .returning("entries")
     .then(entries => {
          res.json(entries[0]);
      })
      .catch(err => res.status(400).json("Error getting entries")); 
 };
 module.exports ={
      counterHandler: imageCounter,
      handleApiCall
 }