const callSendApi = require('../api/callSendApi');
const orderApi = require('../api/orderApi');
const quickRepliesUtils = require('./quickRepliesUtils');
const CONSTANTS = require('../../command/constants');

// title, subtitle,postback_payload is array
function sendTemplateAttachment(sender_psid, title, subtitle, imageUrl, buttonUrl, postback_payload) {
    var elements = [];
    var titleLength = title.length;
    for (let i = 0; i < titleLength; i++) {
        elements.push({
            "title": title[i],
            "subtitle": subtitle[i],
            "image_url": imageUrl[i],
            "buttons": [
                {
                    "title": "Detail",
                    "type": "web_url",
                    "url": buttonUrl[i],
                    "messenger_extensions": true,
                    "webview_height_ratio": "tall",
                    "fallback_url": buttonUrl[i]
                }
            ]
        })
    }

    var response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "list",
                "top_element_style": "compact",
                "elements": elements,
                "buttons": [
                    {
                        "title": "Shopping more",
                        "type": "postback",
                        "payload": postback_payload
                    }
                ]
            }
        }
    }
    return callSendApi(sender_psid, response);
}

function sendTemplatePhone(SERVER_URL, sender_psid) {
    let response = {
        attachment: {
            type: "template",
            payload: {
                template_type: "button",
                text: "Please set your phone number to see",
                buttons: [{
                    type: "web_url",
                    url: SERVER_URL + "/authen/getPhoneNumber/" + sender_psid,
                    title: "PhoneNumber",
                    webview_height_ratio: "compact",
                    messenger_extensions: true
                }]
            }
        }
    };
    callSendApi(sender_psid, response);
}

function sendTemplateCart(SERVER_URL, sender_psid) {
    orderApi.listShoppingCart(CONSTANTS.USERS[sender_psid])
    .then(cart => {
    console.log("TCL: sendTemplateCart -> cart", cart)
    if (cart.result.length == 0 || cart == null) {
        quickRepliesUtils.quickReplies(sender_psid, "You don't add to cart yet.\nShopping here", ['Shopping', 'View Promotion'], [CONSTANTS.PAYLOAD.SHOPPING, CONSTANTS.PAYLOAD.PROMOTION]);
        return null;
    } else {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Click here to see your cart",
                    buttons: [{
                        type: "web_url",
                        url: SERVER_URL + "/order/list-cart/" + sender_psid,
                        title: "List Cart",
                        webview_height_ratio: "full",
                        messenger_extensions: true
                    }]
                }
            }
        };
        callSendApi(sender_psid, response);
    }
    })
    .catch(err => {
        console.log(err);
    })
    
}

module.exports = {
    sendTemplateAttachment,
    sendTemplatePhone,
    sendTemplateCart
}