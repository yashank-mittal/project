require('./models/database');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const faqControllers = require('./controllers/FaqControllers');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('view engine','ejs');
app.use('/views',express.static("stuff"));


app.get('/',(req,res)=>{
    res.send("Welcome to FAQ");
})

app.listen(8080, () => {
    console.log('Express server started at port : 8080');
});

app.use('/faq', faqControllers);