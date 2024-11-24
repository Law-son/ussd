const express = require("express");
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('This is the AgriConnect USSD service.');
});

app.post('*', (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    // Main Menu
    if (text === "") {
        response = `CON Welcome to AgriConnect:
        1. Subscribe
        2. Access Climate/Weather Data
        3. Link to Buyers
        4. Trade Seeds
        5. Exit`;
    } 
    // Subscription
    else if (text === "1") {
        response = `CON Enter your full name to subscribe:`;
    } else if (text.startsWith("1*")) {
        let name = text.split('*')[1];
        response = `END Thank you, ${name}. You have successfully subscribed to AgriConnect.`;
    } 
    // Access Climate/Weather Data
    else if (text === "2") {
        response = `CON Select crop type:
        1. Maize
        2. Rice
        3. Cassava`;
    } else if (text === "2*1") {
        response = `END Current weather data suggests planting drought-resistant maize for better yield.`;
    } else if (text === "2*2") {
        response = `END Climate conditions are favorable for planting early-maturing rice.`;
    } else if (text === "2*3") {
        response = `END Cassava is highly resilient in this season. Suitable for planting now.`;
    } 
    // Link to Buyers
    else if (text === "3") {
        response = `END We are connecting you to potential buyers. Expect a call from our team shortly.`;
    } 
    // Trade Seeds
    else if (text === "4") {
        response = `END To trade seeds, please contact our support team. We will reach out to you shortly.`;
    } 
    // Exit
    else if (text === "5") {
        response = `END Thank you for using AgriConnect. Goodbye.`;
    } 
    // Invalid Input
    else {
        response = `END Invalid input. Please try again.`;
    }

    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
