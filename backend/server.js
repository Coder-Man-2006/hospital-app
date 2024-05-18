// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { predictDoctorAssignment, fetchNeureloData } = require('./aiModel');

const app = express();
app.use(bodyParser.json());

app.post('/assign', async (req, res) => {
    const patientData = req.body;

    predictDoctorAssignment(patientData, (predictions) => {
        res.json(predictions);
    });
});

app.get('/data/:type', async (req, res) => {
    const dataType = req.params.type;

    try {
        const data = await fetchNeureloData(dataType);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
