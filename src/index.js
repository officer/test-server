const express = require('express');
const cors      = require('cors');
const app = express();
const parser = require('body-parser');

const corsOptions = {
    origin: "*",
    methods: [
        'GET',
        'POST',
        'PUT'
    ],
    allowedHeaders: [
        'Content-Type'
    ]
}

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

var currentBookId = 3;
var currentNoteId = [2, 1, 1];

var books = [
    {
        id: 0,
        name: "test"
    },
    {
        id: 1,
        name: "Sandal"
    },
    {
        id: 2,
        name: "Saruman"
    }
]

var notes = [
    {
        noteId: 0,
        bookId: 0,
        subject: "Sample note1",
        content: "This is sample note content 1",
        createdAt: new Date(),
        lastModified: new Date()
    },
    {
        noteId: 0,
        bookId: 1,
        subject: "Sample note2",
        content: "This is sample note content 2",
        createdAt: new Date(),
        lastModified: new Date()
    },
    {
        noteId: 1,
        bookId: 0,
        subject: "Sample note3",
        content: "This is sample note content 3",
        createdAt: new Date(),
        lastModified: new Date()
    },
    {
        noteId: 0,
        bookId: 2,
        subject: "Sample note4",
        content: "This is an example note content 4",
        createdAt: new Date(),
        lastModified: new Date()
    }
]

// Allow Pre-flight access
app.options("/*", cors(corsOptions));

app.get("/", (req, res) => {
    console.log(JSON.stringify(req.params));
    console.log(JSON.stringify(req.headers));
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

app.get("/books", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.json(books);
})

app.get("/book/:bookId/note/:noteId", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    res.json(JSON.stringify(notes[req.params.noteId]))
})

app.get("/book/:bookId/notes", (req, res) => {
    const filteredNotes = notes.filter( value => {
        return value.bookId == req.params.bookId;
    } );
    res.set("Access-Control-Allow-Origin", "*");
    res.json(JSON.stringify(filteredNotes));
});


app.post("/book", (req, res) => {
    console.info(req.body);
    books.push({
        id: ++currentBookId,
        name: req.body.name
    })
    currentNoteId.push(0);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.json({
        bookId: currentBookId
    })
})

app.post("/note", (req, res) => {
    notes.push({

    })
});

app.put("/book/:bookId", (req, res) => {
    console.info(req.body);

    books[req.params.bookId].name = req.body.name;
    res.set("Access-Control-Allow-Origin", "*");
    res.json(JSON.stringify(books[req.params.bookId]));
});

app.delete("/book/:boookId", (req, res) => {
    var response;
    if( books[req.params.bookId] ){
        delete books[req.params.bookId];
        res.statusCode = 200;
        response = {
            "success": true
        }
    }else {
        res.statusCode = 404;
        response = {
            "success": false,
            "error": {
                "errorCode": "404",
                "message": "The book specified does not exist."    
            }
        }
    }

    res.set("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(response));

})


app.listen(8080, '0.0.0.0'); 
