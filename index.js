const express = require("express");
// const equipes = require("./equipes.json");
const app = express();
const fs =  require("fs");
app.use(express.json());

//Connexion BD
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bdmonapi';
let db
MongoClient.connect(url, function(err, client) {
    db = client.db(dbName);
    console.log("Connexion db reussie");
});
//Fin Connexion BD

app.listen(8080,() => {
});

//Rest API DB Endpoints
app.get('/equipes', (req, res) => {
    db.collection('Equipe').find({}).toArray(function(err, docs){
        if(err){
            console.log(err);
            throw err;
        }
        res.status(200).json(docs);
    });
});

app.get('/equipes/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    try {
        const docs = await db.collection('Equipe').find({id}).toArray();
        res.status(200).json(docs);
    } catch (error) {
        console.log(err);
        throw err;
    }
});

app.post('/equipes', async (req,res) => {
    try {
        const equipe = await db.collection('Equipe').insertOne(req.body);
        res.status(200).json(equipe);
    } catch (error) {
        console.log(err);
        throw err;
    }
});

app.put('/equipes/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    try {
        const equipe = await db.collection('Equipe').replaceOne({id}, req.body);
        res.status(200).json(equipe);
    } catch (error) {
        console.log(err);
        throw err;
    }
});

app.delete('/equipes/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    try {
        const equipe = await db.collection('Equipe').deleteOne({id});
        res.status(200).json(equipe);
    } catch (error) {
        console.log(err);
        throw err;
    }
});
//END Rest API DB Endpoints


//Rest API JSON Endpoints
// app.get('/equipes',(req,res) => {
//     res.status(200).json(equipes);
// });

// app.get('/equipes/:id',(req,res) => {
//     const id = parseInt(req.params.id);
//     const equipe = equipes.find(e => e.id === id);
//     res.status(200).json(equipe);
// });

// app.post('/equipes',(req,res) => {
//     equipes.push(req.body)
//     fs.writeFileSync("equipes.json",JSON.stringify(equipes));
//     res.status(200).json(equipes);
// });

// app.put('/equipes/:id',(req,res) => {
//     const id = parseInt(req.params.id);
//     const equipe = equipes.find(e => e.id === id);
//     equipe.name = req.body.name;
//     equipe.country = req.body.country;
//     fs.writeFileSync("equipes.json",JSON.stringify(equipes));
//     res.status(200).json(equipes);
// });

// app.delete('/equipes/:id',(req,res) => {
//     const id = parseInt(req.params.id);
//     const equipe = equipes.find(e => e.id === id);
//     if(equipe != null){
//         equipes.splice(equipes.indexOf(equipe));
//     }
//     fs.writeFileSync("equipes.json",JSON.stringify(equipes));
//     res.status(200).json(equipes);
// });
//END Rest API JSON Endpoints