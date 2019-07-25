// handle payload in here

const CONSTANTS = require('../../command/constants');

const quickRepliesUtils = require('./quickRepliesUtils');
const callSendApi = require('../api/callSendApi');
const templateUtis = require('./templateUtil');
const orderApi = require('../api/orderApi');
const catalog = require('../components/catalog/catalog');
const orderComp = require('../components/order/order');

function handlePayloadQuickReplies(sender_psid, payload, user) {
    var statusUser = user.status;
    // console.log("postback: ", payload);
    // console.log("payload User: ", user);
    if (payload == CONSTANTS.PAYLOAD.ORDER.SEARCH_BY_CODE_ORDER) {
        if (statusUser == 412) {
            templateUtis.sendTemplatePhone(CONSTANTS.SERVER_URL, sender_psid);
            return 2;
        } else {
            quickRepliesUtils.quickReplies(sender_psid, "Please input your code order:", ["I don't know"], [CONSTANTS.PAYLOAD.CHECK_ORDERS]);
            return 1;
        }
    }
    if (payload == CONSTANTS.PAYLOAD.CHECK_ORDERS) {
        console.log("statusUser:", statusUser);
        // if missing phonenumber, convert 3 button into 3 link url
        if (statusUser == 412) {
            templateUtis.sendTemplatePhone(CONSTANTS.SERVER_URL, sender_psid);
        } else {
            quickRepliesUtils.quickReplies(
                sender_psid,
                "We’ll be happy to help you. Select from the following",
                [
                    "Search by code order",
                    "Nestest list order",
                    "Take to an agent",
                ],
                [CONSTANTS.PAYLOAD.ORDER.SEARCH_BY_CODE_ORDER, CONSTANTS.PAYLOAD.ORDER.NESTEST_LIST_ORDER, CONSTANTS.PAYLOAD.TAKE_AGENT]
            );
        }
        return 1;
    }
    if (payload == CONSTANTS.PAYLOAD.CHECK_CART) {
        console.log("statusUser:", statusUser);
        // if missing phonenumber, convert 3 button into 3 link url
        if (statusUser == 412) {
            templateUtis.sendTemplatePhone(CONSTANTS.SERVER_URL, sender_psid);
        } else {
            // console.log("TCL: handlePayloadQuickReplies -> sender_psid", sender_psid)
            templateUtis.sendTemplateCart(CONSTANTS.SERVER_URL, sender_psid);
        }
        return 1;
    }
    if (payload == CONSTANTS.PAYLOAD.SIGN_UP) {
        if (statusUser == 412) {
            templateUtis.sendTemplatePhone(CONSTANTS.SERVER_URL, sender_psid);
        } else {
            quickRepliesUtils.quickReplies(sender_psid, "You have signed in already! ", ['Shopping', 'View Promotion'], [CONSTANTS.PAYLOAD.SHOPPING, CONSTANTS.PAYLOAD.PROMOTION]);
        }
        return 1;
    }
    if (payload == CONSTANTS.PAYLOAD.ORDER.NESTEST_LIST_ORDER) {
        orderApi.callListOrder(user)
            .then((listOrder) => {
            console.log("TCL: handlePayloadQuickReplies -> listOrder", listOrder)
                if (listOrder.result.length != 0) {
                    let title = [];
                    let subtitle = [];
                    let imageUrl = [];
                    let buttonUrl = [];
                    if (listOrder.result.length == 1) {
                        var detailOrder = listOrder.result[0];
                        if (detailOrder.status == "WAITING_FOR_CONFIRMATION") {
                            response = orderComp.handleStatusOfOrder(detailOrder.status, "https://think.kera.org/wp-content/uploads/2018/11/hourglass-800x500.jpg", "Your order is ordered at " + detailOrder.date + ", expect to have it in a few days.");
                        }
                        if (detailOrder.status == "CANCELED") {
                            response = orderComp.handleStatusOfOrder(detailOrder.status, "https://medias1.prestastore.com/749961-pbig/era-customer-order-cancel-from-frontend.jpg", "Your order is canceled at " + detailOrder.date + ".");
                        }
                        return callSendApi(sender_psid, response);
                    }
                    if (listOrder.result.length < 4) {
                        for (let i = 0; i < listOrder.result.length; i++) {
                            title.push("Code:   " + listOrder.result[i].orderCode);
                            subtitle.push("Status order:  " + listOrder.result[i].status + "\nDate:   " + listOrder.result[i].date);
                            imageUrl.push("https://think.kera.org/wp-content/uploads/2018/11/hourglass-800x500.jpg");
                            buttonUrl.push(CONSTANTS.SERVER_URL + "/order/order-detail/" + listOrder.result[i].orderOutletID + "/" + sender_psid);
                        }
                    } else {
                        for (let i = 0; i < 4; i++) {
                            title.push("Code:   " + listOrder.result[i].orderCode);
                            subtitle.push("Status order:  " + listOrder.result[i].status + "\nDate:   " + listOrder.result[i].date);
                            imageUrl.push("https://think.kera.org/wp-content/uploads/2018/11/hourglass-800x500.jpg");
                            buttonUrl.push(CONSTANTS.SERVER_URL + "/order/order-detail/" + listOrder.result[i].orderOutletID + "/" + sender_psid);
                        }
                    }
                    // Params: sender_psid, title, subtitle, imageUrl, buttonUrl, postback_payload
                    return templateUtis.sendTemplateAttachment(sender_psid, title, subtitle, imageUrl, buttonUrl, CONSTANTS.PAYLOAD.SHOPPING);
                } else {
                    quickRepliesUtils.quickReplies(sender_psid, "You don't order yet.\nShopping here", ['Shopping', 'View Promotion'], [CONSTANTS.PAYLOAD.SHOPPING, CONSTANTS.PAYLOAD.PROMOTION]);
                    return null;
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = {
    handlePayloadQuickReplies
}
