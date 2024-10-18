const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('This is a short tutorial on USSD app');
});

app.post('*', (req, res) => {
    let {sessionId, serviceCode, phoneNumber, text} = req.body;
    let response = '';

    if (text === "") {
        // Main Menu
        response = `CON Welcome to EcoSave. Select an option:
        1. Check Balance
        2. Withdraw Money
        3. Buy Airtime/Data
        4. Exit`;
    } else if (text === '1') {
        // Check Balance
        response = `END Your balance is GHS 500.00`;
    } else if (text === '2') {
        // Withdraw Money
        response = `CON Select withdrawal method:
        1. Mobile Money
        2. Bank Account
        3. Return to Main Menu`;
    } else if (text === '2*1') {
        // Withdraw to Mobile Money
        response = `END You have successfully withdrawn money to your mobile money account.`;
    } else if (text === '2*2') {
        // Withdraw to Bank Account
        response = `END You have successfully withdrawn money to your bank account.`;
    } else if (text === '2*3') {
        // Return to Main Menu from Withdraw Money
        response = `CON Welcome to the USSD app. Select an option:
        1. Check Balance
        2. Withdraw Money
        3. Buy Airtime/Data
        4. Exit`;
    } else if (text === '3') {
        // Buy Airtime/Data
        response = `CON Enter the amount:`;
    } else if (text.startsWith('3*')) {
        // Confirm details for Buy Airtime/Data
        let amount = text.split('*')[1];
        response = `CON Confirm purchase of GHS ${amount} airtime/data:
        1. Confirm
        2. Cancel`;
    } else if (text.endsWith('*1')) {
        // Success message for Buy Airtime/Data
        response = `END Purchase of airtime/data successful.`;
    } else if (text.endsWith('*2')) {
        // Return to Main Menu from Buy Airtime/Data
        response = `CON Welcome to the USSD app. Select an option:
        1. Check Balance
        2. Withdraw Money
        3. Buy Airtime/Data
        4. Exit`;
    } else if (text === '4') {
        // Exit
        response = `END Thank you for using our service.`;
    } else {
        response = 'END Invalid input. Please try again.';
    }

    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
