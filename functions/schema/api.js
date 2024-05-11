const express = require ('express');
const serverless = require('serverless-http');
const router = require ('./routes/suthor');
const mongoose = require ('mongoose');
const cors = require ('cors');
const { error } = require('console');

const app = express();

const dbCloudUrl = "mongodb+srv://monterokennethpaul:Kenneth27@monteroapi.xvfvana.mongodb.net/?retryWrites=true&w=majority&appName=MonteroAPI";
const dbLocalUrl = "";

app.use (cors());
app.use(express.json());
app.use (express.urlencoded({extended:true}));

mongoose
.connect(dbCloudUrl || dbCloudUrl)
.then (()=> console.error('Failed to connect to  MongoDB'))
.catch ((error)=> console.error ('Failed to  connect to MongoDB', error));

app.use ('/.netlify/functions/api',router);
module.exports.handler = serverless(app);