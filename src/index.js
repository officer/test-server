const express = require('express');
const app = express();

app.get("/", (req, res) => {
    var status; 
    if(undefined == req.query.status){
        status = 200;
    }else{
        status = Number(req.query.status);
    }

    res.sendStatus(status);

});

app.listen(3000, '0.0.0.0'); 