
const callSendApi = require('../api/callSendApi');
const CONSTANTS = require('../../command/constants');
const SERVER_URL = CONSTANTS.SERVER_URL;

function carouselProduct(sender_psid, title, thumbnail, url, productId, catGroupId, page) {
    var elements = [];
    var response;
    if (title.length == 1) {
        elements.push({
            "title": title[0],
            "image_url": thumbnail[0],
            "subtitle": "We have the right hat for everyone.",
            "buttons": [
                {
                    "type": "postback",
                    "title": "Back",
                    "payload":  CONSTANTS.PAYLOAD.PRODUCT.DEC_LIST_PRODUCT+" "+ catGroupId
                }, {
                    "type": "web_url",
                    "title": "View",
                    "url": SERVER_URL +"/product/product-list/"+ productId[0]+ "/null"
                }
            ]
        });

        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": elements
                }
            }
        }
    }
    else {
        for (var i = 0; i < title.length; i++) {
            elements.push(
                {
                    "title": title[i],
                    "subtitle": "We have the right hat for everyone.",
                    "image_url": thumbnail[i],
                    "default_action": {
                        "type": "web_url",
                        "url": SERVER_URL +"/product/product-list/"+ productId[i] + "/null",
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall",
                        "fallback_url": SERVER_URL +"/product/product-list/"+ productId[i]+"/null"
                    },
                    "buttons": [
                        {
                            "title": "View",
                            "type": "web_url",
                            "url": SERVER_URL +"/product/product-list/"+ productId[i]+ "/null",
                            "messenger_extensions": true,
                            "webview_height_ratio": "tall",
                            "fallback_url": SERVER_URL +"/product/product-list/"+ productId[i]+"/null"
                        }
                    ]
                }
            );
            
            response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "list",
                        "top_element_style": "compact",
                        "elements": elements,
                        "buttons": [{
                            "title": "View More",
                            "type": "postback",
                            "payload":  CONSTANTS.PAYLOAD.PRODUCT.INC_LIST_PRODUCT+ " "+ catGroupId
                        } ]
                    }
                }
            }

        }
    }

    //console.log(response.attachment.payload.elements);

    callSendApi(sender_psid, response);
}

module.exports = carouselProduct;