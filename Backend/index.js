const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const alert = require('alert');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://" +process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology: true}, () => console.log("Successfully connected"));

const PORT  = process.env.PORT || 3001;


const vaultSchema = mongoose.Schema({
    title: {
        type: String,
        required:[true, "Title is empty"]
    },

    description: {
        type: String,
        required: [true, "Description is empty"]
    }
});


const Vault = new mongoose.model("Vault", vaultSchema);




app.get("/home", (req, res) => {

    Vault.find({}, (err, secrets) =>{
        if(err){
            console.log(err);
        } else {
            res.status(200).send(secrets);
        }
    });
});


app.post("/addSecret", (req, res) =>{

    const {title, description} = req.body;

    const newVault = new Vault({
        title: title,
        description: description
    });

    newVault.save(err => {
        if(err){
            console.log(err);
            alert("Secret is not saved. Please fill all the details");
        }
        Vault.find({}, (err, secrets) =>{
            if(err){
                console.log(err);
            } else {
                res.status(200).send(secrets);
            }
        });
    });

});


app.post("/delete", (req, res)=>{

    const {id} = req.body;

    Vault.deleteOne({_id: id}, () => {


        Vault.find({}, (err, secrets) =>{
            if(err){
                console.log(err);
            } else {
                res.status(200).send(secrets);
            }
        });
    });

});



app.listen(PORT, function(err){

    if(err){
        console.log(err);
    } else{
        console.log("Sever is up and running");
    }
});