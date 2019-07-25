const CONSTANTS = require('../../command/constants');
const request = require('request');

function callSendApi(sender_psid, response) {
    var request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": CONSTANTS.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body,
        "headers": {
            'Accept': 'application/json',
            'Cookie': 'loggedIn=true;HttpOnly',
            'Accept-Charset': 'utf-8',
            "appVersion": "1.0",
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJyYSI6MTU2MTYzMjIyNTc2NSwidXNlcm5hbWUiOiIrODQzNTM4NzEyMzAiLCJ1c2VyZ3JvdXBjb2RlIjoiU0hPUFBFUiIsInVzZXJpZCI6NjUsImlhdCI6MTU2MTYzMjIyNX0.tM6LOph1J0kDFAPIq_oyDyEeHwPgBKfigBP-CfP44To'
        }
    }, (err, res, body) => {
        if (!body.error && !err) {
            console.log('message sent!')
        } else {
            console.log(body.error);
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = callSendApi;
