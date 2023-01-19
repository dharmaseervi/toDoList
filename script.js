const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extends: true }));
app.use(express.static("public"));
let items = ["dharmaseervi", "hello, how are you?", ];

app.get("/", function (req, res) {
//   date format
    let today = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", option);


    res.render("list", { kindDay: day, newListItems: items });

});

app.post("/", function (req, res) {
    let item = req.body.text;
    items.push(item);
    res.redirect("/");

})

app.listen(3000, function () {
    console.log("hey server is ready ");
});