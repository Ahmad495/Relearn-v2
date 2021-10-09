const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const relearnRouter = require('./routes/relearn');

mongoose.connect('mongodb://localhost:27017/relearn', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.address = req.url;
    next();
})

app.use('/relearn', relearnRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})