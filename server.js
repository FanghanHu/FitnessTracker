const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

let db = require("./models");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get('/exercise', (req, res) => {
    res.redirect('/exercise.html');
});

app.get('/stats', (req, res) => {
    res.redirect('/stats.html');
});

//get all workouts
app.get('/api/workouts', (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

//get workout by id
app.put('/api/workouts/:id', (req, res) => {
    db.Workout.findOneAndUpdate({_id: req.params.id}, {$push:{exercises: req.body}}).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

//create a new work out
app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});


app.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([{
        $addFields: {
            totalDuration: {$sum: "$exercises.duration"}
        }
    }]).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});