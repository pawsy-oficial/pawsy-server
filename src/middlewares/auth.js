const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/clinica', (req, res) => 
    res.json([{id: $, name: $}])
)

app.get('/tutor', (req, res) => 
    res.json([{id: $, name: $}])
)

app.get('/medic', (req, res) => 
    res.json([{id: $, name: $}])
)



app.post('/login', (req,res) => (
    if(email === queryEmail && password === queryPW){
        ...
    }
))

//depois eu arrumo e continuo