const mongoose = require('mongoose');

var faqschema = new mongoose.Schema({
    ques: {
        type: String
    },
    ans: {
        type: String
    }
});

//creating model
mongoose.model('Todo', faqschema);