const CONSTANTS= require('../../command/constants');

const callSendApi = require('../api/callSendApi');

function callWebView(sender_psid, _text, _url, _title) {
    var response = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: _text,
                buttons: [{
                    type: "web_url",
                    url: CONSTANTS.SERVER_URL + _url,
                    title: _title,
                    webview_height_ratio: "full",
                    messenger_extensions: true
                }]
            }
        }
    };
    callSendApi(sender_psid, response);
}

module.exports = callWebView;