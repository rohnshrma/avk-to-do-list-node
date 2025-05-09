import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

const tasks = [];

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
// home route | root route
app
  .route("/")
  .get((req, res) => {
    res.render("home", {
      title: "My To Do List",
      all_tasks: tasks.length > 0 ? tasks : "No Tasks Found",
    });
  })
  .post((req, res) => {
    tasks.push(req.body.new_item);
    res.redirect("/");
  });

// setup server
app.listen(port, () => {
  console.log("Server started on Port " + port);
});
