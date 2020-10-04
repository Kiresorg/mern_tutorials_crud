const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse HTTP requests with content-type = application/jason
app.use(bodyParser.json());

// parse HTTP requests with content-type = application/x-www-form-urnencoded
app.use(bodyParser.urlencoded({ extended: true }));

// top-level route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Erik's tutorial CRUD app"});
});

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to dB");
    })
    .catch(err => {
        console.log("Unable to connect to dB", err);
    });

// set routes
require("./app/routes/tutorial.routes")(app);


// set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})