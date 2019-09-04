const express = require('express');
const sleep = require('sleep');
const app = express();

app.get("/", (req, res) => {
    var status; 
    if(undefined == req.query.status){
        status = 200;
    }else{
        status = Number(req.query.status);
    }

    var second;
    if(undefined == req.query.sleep){
        second = 0;
    }else{
        second = Number(req.query.sleep);
    }

    sleep.sleep(second);

    res.sendStatus(status);

});

app.listen(3000, '0.0.0.0'); 