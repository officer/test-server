const express = require('express');
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


    res.sendStatus(status);

});

app.listen(80, '0.0.0.0'); 