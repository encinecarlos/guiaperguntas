const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Question = require('./database/Question');
const Answer = require('./database/Answer');

const port = 3000;

connection.authenticate().then(() => console.log('connection ok'))
    .catch((error) => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    Question.findAll({
        raw: true,
        order: [['id', 'desc']]
    }).then((questions) => {
        res.render('index', {
            questions: questions
        });
    });
});

app.get('/ask', (req, res) => {
    res.render('ask');
});

app.post('/ask', (req, res) => {
    let title = req.body.title;
    let question = req.body.question;

    Question.create({
        title: title,
        question: question
    }).then(() => {
        res.redirect('/');
    });
});

app.get('/question/:id', (req, res) => {
    let id = req.params.id;

    Question.findOne({
        where: { id: id }
    }).then((question) => {
        if (question != undefined) {
            Answer.findAll({    
                //raw: true,            
                where: { questionId: id },
                order: [['id', 'desc']]
            }).then((answers) => {
                console.log(answers);
                res.render('question', {
                    question: question,
                    responses: answers
                });
            });
            
        } else {
            res.redirect('/');
        }
        
    }).catch(() => { })
});

app.post('/answer', (req, res) => {
    let body = req.body.answer;
    let questionId = req.body.questionId;

    Answer.create({
        body: body,
        questionId: questionId
    }).then(() => {
        res.redirect('/question/' + questionId);
    });
});

app.listen(port, () => console.log(`Server running on port ${port}!`));