const callSendApi = require('../api/callSendApi');
const CONSTANTS = require('../../command/constants');

// title, postback_payload is array
function quickReplies(sender_psid, text, title, postback_payload) {
    var replies = [];
    for (var i = 0; i < title.length; i++) {
        replies.push({
            "content_type": "text",
            "title": title[i],
            "payload": postback_payload[i]
        });
    }

    var response = {
        "text": text,
        "quick_replies": replies
    }

    return callSendApi(sender_psid, response);
}

function handleQuickReplies(sender_psid, received_message) {
    if (received_message && received_message.quick_reply && received_message.quick_reply.payload === 'PROMOTION') {
        quickReplies(sender_psid, "Can I help you?", ['Store', 'Hot Deals', 'Fast selling'], [CONSTANTS.PAYLOAD.STORE, CONSTANTS.PAYLOAD.HOT_DEALS, CONSTANTS.PAYLOAD.FAST_SELLING]);
    }
    else if (received_message.text && !received_message.quick_reply) {
        quickReplies(sender_psid, "Can I help you?", ['Shopping', 'View Promotion'], [CONSTANTS.PAYLOAD.SHOPPING, CONSTANTS.PAYLOAD.PROMOTION]);
    }
}

function quickRepliesForEachTest(senderID, quickReplyPayload, testName, pool) {
    if (quickReplyPayload == testName) {
      pool.query("SELECT * From " + testName, (err, res) => {
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].status == 0) {
            return quickReplies(
              senderID,
              res.rows[i].question,
              [res.rows[i].a, res.rows[i].b, res.rows[i].c, res.rows[i].d],
              [
                testName + "," + res.rows[i].code + ",1",
                testName + "," + res.rows[i].code + ",2",
                testName + "," + res.rows[i].code + ",3",
                testName + "," + res.rows[i].code + ",4"
              ]
            );
          }
        }
      });
    } else if (
      quickReplyPayload.includes(testName) &&
      quickReplyPayload.length > 7
    ) {
      // status = 0 : don't exam
      // status = 1 : true
      // status = 2 : false
      pool.query("SELECT * From "+ testName, (err, res) => {
        var code = parseInt(quickReplyPayload.split(",")[1]);
        var your_answer = parseInt(quickReplyPayload.split(",")[2]);
        for (let i = 0; i < res.rows.length; i++) {
          var status = 0;
          if (res.rows[i].code == code) {
            if (res.rows[i].answer_code == your_answer) {
              status = 1;
            } else status = 2;
            pool.query(
              "UPDATE public." + testName + " SET status= " +
                status +
                " WHERE code = " +
                code +
                ";",
              (err, result) => {
                console.log("Update status OK!");
              }
            );

            if (i == res.rows[i].length - 1) {
              pool.query("UPDATE public." + testName + " SET status = 0;", (err, result) => {
                console.log("Update status for all");
              });
              return callSendApi(senderID, {
                text: res.rows[i].answer + "\n\n" + "You are completed your test"
              });
            }
            var check_next_question = 0;
            for (let j = i + 1; j < res.rows.length; j++) {
              if (res.rows[j].status == 0) {
                check_next_question = 1;
                return quickReplies(
                senderID,
                res.rows[i].answer + "\n\n" + res.rows[j].question,
                [
                  res.rows[j].a,
                  res.rows[j].b,
                  res.rows[j].c,
                  res.rows[j].d
                ],
                [
                  testName + "," + res.rows[j].code + ",1",
                  testName + "," + res.rows[j].code + ",2",
                  testName + "," + res.rows[j].code + ",3",
                  testName + "," + res.rows[j].code + ",4"
                ]
              );
              }
            }
            if (check_next_question == 0) {
              pool.query("UPDATE public." + testName + " SET status = 0;", (err, result) => {
                console.log("Update status for all");
              });
              return callSendApi(senderID, {
                text: res.rows[i].answer + "\n\n" + "You are completed your test"
              });
            }
          }
        }
      });
    } else {
      return callSendApi(senderID, "quick reply");
    }
}
module.exports = {
    quickReplies, handleQuickReplies, quickRepliesForEachTest
}
