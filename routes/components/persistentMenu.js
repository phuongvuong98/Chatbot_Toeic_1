const request = require('request');
const CONSTANTS = require('../../command/constants');

function persistentMenu() {
    return new Promise((resolve, reject) => {
        let request_body = {
            "whitelisted_domains": [
                "https://facebook.com/",
                CONSTANTS.SERVER_URL,
                "https://www.messenger.com/"
            ],
            "greeting": [
                {
                    "locale": "default",
                    "text": "Welcome to SmartShopper {{user_full_name}}! Click Get Started to enjoy our sample automated messaging experience."
                }
            ],
            "get_started": {
                "payload": CONSTANTS.PAYLOAD.GET_STARTED,

            },
            "persistent_menu": [
                {
                    "locale": "default",
                    "composer_input_disabled": false,
                    "call_to_actions": [
                        {
                            "type": "postback",
                            "title": "Choose your test",
                            "payload": CONSTANTS.PAYLOAD.CHOOSE_TEST
                        }
                    ]
                }
            ]
        }
        request({
            uri: 'https://graph.facebook.com/v3.3/me/messenger_profile?access_token=' + CONSTANTS.PAGE_ACCESS_TOKEN,
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
            },
            method: "POST",
            json: request_body
        }, (error, response, body) => {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        })
    })
}
module.exports = {
    persistentMenu
}