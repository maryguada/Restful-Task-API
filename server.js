////////// EXPRESS //
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

///////// PORT SETUP // 
app.listen(5000, () => console.log("listening on port 5000"));

///////// API JSON SETUP //
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

////// ANGULAR CONNECTION TO PUBLIC //
app.use(express.static( __dirname + '/public/dist/public' ));

////////// MONGOOSE //
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasksDB', {useNewUrlParser: true});

const TaskSchema = new mongoose.Schema({
    title: {type: String, required:true},
    description: {type: String, default: ''},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
    })

const Task = mongoose.model('Task', TaskSchema);

////////////// ROUTES ////////////////////////////////

/// 1. Retrieve all tasks
app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.json(err));
});

/// 2. Retrieve by ID
app.get('/tasks/:id', (req, res) => {
    Task.findOne({_id: req.params.id})
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

/// 3. Create Task
app.post('/task', (req, res) => {
    Task.create(req.body)
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

/// 4. Update Task
app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
        .then(task => res.json(task))
        .catch(err => res.json(err));
});

/// 5. Delete Task
app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id)
        .then(task => res.json(task))
        .catch(err => res.json(err));
});