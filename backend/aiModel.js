// aiModel.js
const { spawn } = require('child_process');
const path = require('path');

const predictDoctorAssignment = (patientData, callback) => {
    const predictScript = path.join(__dirname, 'scripts', 'predict_svm.py');
    const process = spawn('python', [predictScript]);

    let output = '';

    process.stdout.on('data', (data) => {
        output += data.toString();
    });

    process.stdout.on('end', () => {
        const predictions = JSON.parse(output);
        callback(predictions);
    });

    process.stdin.write(JSON.stringify(patientData));
    process.stdin.end();
};

module.exports = { predictDoctorAssignment };