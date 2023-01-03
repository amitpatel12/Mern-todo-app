const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors')

const dbConnect = require("./mongodb");
const {ObjectId} = require("mongodb")

//port
const port = 3000;

// init app
const app = express();
app.use(cors());

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// static folder public render
app.use(express.static(path.join(__dirname, "public")));

//View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//connect to mongodb
// MongoClient.connect(url, (err, database) => {
//     console.log('mongodb connected..')
//     if(err) throw err;
// })

// const dbConnect = require('./mongodb')
// let todos = [{}]

const database = async () => {
  Todos = await dbConnect();
  console.log(Todos);

  // update all match = data.update
  // todos = await data.find().toArray()

  // console.log(todos);
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
};
database();

app.get("/", async (req, res, next) => {
  Todos.find({}).toArray((err, todos) => {
    if (err) return console.log(err);
    // res.status(200).json(todos)
    res.render("index", {
      todos: todos,
    });
  });
});

app.post("/todo/add", (req, res, next) => {
  const todo = {
    head: req.body.head,
    text: req.body.text,
  };

  //insert
  Todos.insert(todo, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("Todos added...");
    // console.log(result);
    res.redirect("/");
  });
});

app.delete("/todo/delete/:id", (req, res, next) => {
  const query = { _id: ObjectId(req.params.id)};
  Todos.deleteOne(query, (err, response) => {
    if (err) {
      return console.log(err);
    }
    console.log("Todo Removed...");
    res.send(200);
    
  });
});

app.get("/todo/edit/:id", (req, res, next) => {
    const query = { _id: ObjectId(req.params.id)};
    Todos.find(query).next((err, todo) => {
      if (err) return console.log(err);
  
      res.render("edit", {
        todo: todo,
      });
    });
  });


  app.post("/todo/edit/:id", (req, res, next) => {
    const query = { _id: ObjectId(req.params.id)};

    const todo = {
      head: req.body.head,
      text: req.body.text,
    };
  
    //update
    Todos.updateOne(query, {$set:todo}, (err, result) => {
      if (err) {
        return console.log(err);
      }
      console.log("Todos updated...");
    //   console.log(result);
      res.redirect("/");
    });
  });