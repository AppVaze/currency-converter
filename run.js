const express = require('express');
const CC = require('currency-converter-lt');

const cors = require("cors");

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// simple route
app.post("/api/convert", (req, res) => {
    if (!req.body.from) {
        res.status(400).send(
            {
                message: "Content can't be empty"
            }
        );
        return;
    }

    let currencyConverter = new CC({ from: req.body.from, to: req.body.to, amount: req.body.amount })
    currencyConverter.convert().then((response) => {
        res.send({
            result: response
        })
    })

});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});