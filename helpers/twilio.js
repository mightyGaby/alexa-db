'use strict';
require('dotenv').load();

var accountSid = process.env.TWILIO_ACCOUNT_SID; 
var authToken = process.env.TWILIO_AUTH_TOKEN;
var twilioNumber = process.env.TWILIO_NUMBER;
var client = require('twilio')(accountSid, authToken);

function GetTwilioMessageHelper() {

}

GetTwilioMessageHelper.prototype.requestTwilioData = function(data, message) { 

    return this.formatTwilioData(data, message);
};

GetTwilioMessageHelper.prototype.formatTwilioData = function(data, message) {

    let options = {
        to: '+1' + data.phoneNumber,
        from: twilioNumber,
        body: message
    }

    return this.sendTwilioMessage(options);
};

GetTwilioMessageHelper.prototype.sendTwilioMessage = function(options) {

    let sentMessage = client.messages.create(options, function(err, responseData) {
        
        if(!err) {
            console.log(responseData.from);
            console.log(responseData.body);
        }
    });

    return(sentMessage);
};

module.exports = GetTwilioMessageHelper;