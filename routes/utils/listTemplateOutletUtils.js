
const callSendApi = require('../api/callSendApi');
const CONSTANTS = require('../../command/constants');

function listTemplateOutlet(sender_psid, outletSearch, outletLoyalty,lat, lon) {
    var elements = [];
    if(lat== null || lon== null){
        lat= "null";
        lon = "null";
    }
    
    if(outletLoyalty.length == 1 && outletLoyalty[0].length > 0){
        for (var i = 0; i < outletLoyalty[0].length; i++) {
            elements.push(
                {
                    "title": outletLoyalty[0][i].outletName,
                    "subtitle": outletLoyalty[0][i].address +"\n" + outletLoyalty[0][i].distance,
                    "default_action": {
                        "type": "web_url",
                        "url": CONSTANTS.SERVER_URL + "/outlet/outlet-detail/" + outletLoyalty[0][i].outletId +"/"+lat+"/"+lon,
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall"
                    }
                }
            );
        }
        
    }
    else{
        for (var i = 0; i < outletSearch.length; i++) {
            elements.push(
                {
                    "title": outletSearch[i].outletName,
                    "subtitle": outletSearch[i].address +"\n" + outletSearch[i].distance,
                    "default_action": {
                        "type": "web_url",
                        "url": CONSTANTS.SERVER_URL + "/outlet/outlet-detail/" + outletSearch[i].outletId +"/"+lat+"/"+lon,
                        "messenger_extensions": true,
                        "webview_height_ratio": "tall"
                    }
                }
            );
        }
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
                        "title": "View More",
                        "type": "postback",
                        "payload": "payload"
                    }
                ]
            }
        }
    }
    callSendApi(sender_psid, response);
}

module.exports = listTemplateOutlet;