const express = require ('express');
const serverless = require('serverless-http');
const router = require ('./routes/author');
const mongoose = require ('mongoose');
const cors = require ('cors');
const { error } = require('console');

const app = express();

const dbCloudUrl = "mongodb+srv://monterokennethpaul:kenneth27@monteroapi.xvfvana.mongodb.net/?retryWrites=true&w=majority&appName=MonteroAPI";
const dbLocalUrl = "mongodb://localhost:27017/test/authors";

app.use (cors());
app.use(express.json());
app.use (express.urlencoded({extended:true}));

mongoose
.connect(dbCloudUrl || dbLocalUrl)
.then (()=> console.error('Connected to MongoDB'))
.catch ((error)=> console.error ('Failed to  connect to MongoDB', error));

app.use ('/.netlify/functions/api',router);
module.exports.handler = serverless(app);