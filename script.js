const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js")
const app = express();
mongoose.set('strictQuery', false);
// use ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extends: true }));
// used to get file from any directory
app.use(express.static("public"));

// connecting mongoDb server
mongoose.connect("mongodb+srv://dharmaseervijb:12345@cluster0.6pdbdtn.mongodb.net/toDoList", { useNewUrlParser: true });


//creating mongoDb schema
const itemsSchema = {
    name: String
};

// creating module
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "welcome to do list"
});
const item2 = new Item({
    name: "hit add button to add items"
});

const defaultitem = [item1, item2,];

app.get("/", function (req, res) {
    //   date format
    let day = date.getDate();

    Item.find({}, function (err, findItem) {
        // insert the default data only once
        if (findItem.length === 0) {
            Item.insertMany(defaultitem, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successful");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { kindDay: day, newListItems: findItem });
        }
    });
});

app.post("/", function (req, res) {
    const itemName = req.body.text;
    const item = new Item({
        name: itemName
    })
    item.save();
    res.redirect("/");
})

// to delete the item
app.post("/delete", function (req, res) {
    const checkItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkItemId, function (err) {
        if(!err){
        console.log("deleted successfully");
        res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

app.listen(port, function () {
    console.log("server is ready");
});