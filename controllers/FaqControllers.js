const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const todo = mongoose.model('Todo');

router.get('/', (req, res) => {
    res.render("faq/create_update", {
        viewTitle: "Insert QuestionAir"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
    {
        add(req, res);
    }

    else
        todoupdate(req, res);
});


function add(req, res) {
    var faq = new todo();
    faq.ques = req.body.ques;
    faq.ans = req.body.ans;
    faq.save((err, doc) => {
        if (!err) {
            res.redirect('faq/views');
            console.log("Successful ")
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("faq/create_update", {
                    viewTitle: "Insert QuestionAir",
                    faq: req.body
                });
            } else
                console.log('Cannot get insertion successfully : ' + err);
        }
    });
}

function todoupdate(req, res) {
    todo.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('faq/viewnames'); } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("faq/create_update", {
                    viewTitle: 'Update Employee',
                    faq: req.body
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/views', (req, res) => {
    todo.find((err, docs) => {
        if (!err) {
            res.render("faq/viewnames", {
                names: docs
            });
        } else {
            console.log('Cannot get FAQ  view_names :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'ques':
                body['quesError'] = err.errors[field].message;
                break;
            case 'ans':
                body['ansError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    todo.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("faq/create_update", {
                viewTitle: "Update Questions",
                faq: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    todo.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/faq/views');
        } else { console.log('Unsuccesful QuestionAir delete :' + err); }
    });
});

module.exports = router;