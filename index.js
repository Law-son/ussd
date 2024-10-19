const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('This is LibertyLink USSD service.');
});

app.post('*', (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    let response = '';

    if (text === "") {
        // Main Menu
        response = `CON Welcome to LibertyLink:
        1. Log a Complaint
        2. Speak to a Service Person
        3. Know Your Rights
        4. Exit`;
    } else if (text === '1') {
        // Log a Complaint
        response = `CON Please briefly describe the issue:`;
    } else if (text.startsWith('1*')) {
        // Confirm complaint submission
        let complaint = text.split('*')[1];
        response = `END Your complaint has been logged. Our team will call you shortly.`;
    } else if (text === '2') {
        // Speak to a Service Person
        response = `END Please wait, a service person will call you soon.`;
    } else if (text === '3') {
        // Know Your Rights
        response = `CON Select the right to learn about:
        1. Right to Education
        2. Right to Health
        3. Right to Freedom`;
    } else if (text === '3*1') {
        // Summary of Right to Education
        response = `END The Right to Education ensures access to basic education for everyone.`;
    } else if (text === '3*2') {
        // Summary of Right to Health
        response = `END The Right to Health ensures access to healthcare services for all.`;
    } else if (text === '3*3') {
        // Summary of Right to Freedom
        response = `END The Right to Freedom protects your ability to express yourself and move freely.`;
    } else if (text === '4') {
        // Exit
        response = `END Thank you for using LibertyLink.`;
    } else {
        response = 'END Invalid input. Please try again.';
    }

    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
