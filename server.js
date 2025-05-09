import express from "express";
// Imports the Express.js framework, which simplifies building web servers in Node.js

import bodyParser from "body-parser";
// Imports the body-parser middleware to parse incoming request bodies (e.g., form data)

const app = express();
// Creates an Express application instance, which handles HTTP requests and responses

const port = 3000;
// Defines the port number (3000) where the server will listen for requests

const tasks = [];
// Initializes an empty array to store tasks in memory (not persistent; resets on server restart)

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Applies body-parser middleware to parse URL-encoded form data (e.g., from the <form> in home.ejs)
// `extended: true` allows parsing of nested objects in the form data

app.use(express.static("public"));
// Serves static files (e.g., style.css, images) from the "public" folder
// Any file in the "public" folder can be accessed via the browser (e.g., /style.css)

app.set("view engine", "ejs");
// Sets EJS as the templating engine for rendering dynamic HTML pages
// Express will look for .ejs files in the "views" folder (e.g., home.ejs)

// routes
// home route | root route
app
  .route("/")
  // Defines a route for the root URL ("/") that handles both GET and POST requests
  .get((req, res) => {
    // Handles GET requests (e.g., when the user visits the page)
    res.render("home", {
      // Renders the "home.ejs" template and passes data to it
      title: "My To Do List",
      // Sets the page title to "My To Do List"
      all_tasks: tasks.length > 0 ? tasks : "No Tasks Found",
      // Passes the tasks array if it has items; otherwise, passes the string "No Tasks Found"
    });
  })
  .post((req, res) => {
    // Handles POST requests (e.g., when the form is submitted)
    tasks.push(req.body.new_item);
    // Adds the new task (from the form's "new_item" input) to the tasks array
    // `req.body` contains the parsed form data (thanks to body-parser)
    res.redirect("/");
    // Redirects the user back to the root URL ("/"), triggering a GET request to refresh the page
  });

// setup server
app.listen(port, () => {
  // Starts the server, listening for requests on the specified port (3000)
  console.log("Server started on Port " + port);
  // Logs a message to the console to confirm the server is running
});
