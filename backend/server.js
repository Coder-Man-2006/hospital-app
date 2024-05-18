// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { predictDoctorAssignment } = require('./aiModel');

const app = express();
app.use(bodyParser.json());

app.post('/assign', (req, res) => {
    const patientData = req.body;

    predictDoctorAssignment(patientData, (predictions) => {
        res.json(predictions);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
