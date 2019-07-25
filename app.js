"use strict";

const bodyParser = require("body-parser"),
  express = require("express"),
  https = require("https"),
  request = require("request");

var app = express();
app.set("port", process.env.PORT || 5000);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("public"));

var pool = require("./db/connect");

const CONSTANTS = require("./command/constants");
const callSendApi = require("./routes/api/callSendApi");
const persistentMenu = require("./routes/components/persistentMenu");
const quickReplyUtils = require("./routes/utils/quickRepliesUtils");

/*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 */
app.get("/webhook", function(req, res) {
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === CONSTANTS.TOKEN
  ) {
    console.log("Validating webhook");
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post("/webhook", function(req, res) {
  var data = req.body;
  if (data.object == "page") {
    data.entry.forEach(function(pageEntry) {
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log(
            "Webhook received unknown messagingEvent: ",
            messagingEvent
          );
        }
      });
    });
    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  var senderID = event.sender.id;
  var message = event.message;

  if (message.quick_reply) {
    quickReplyUtils.quickRepliesForEachTest(senderID, message.quick_reply.payload, "testone", pool);
    quickReplyUtils.quickRepliesForEachTest(senderID, message.quick_reply.payload, "testtwo", pool);
  }
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var payload = event.postback.payload;

  if (payload == CONSTANTS.PAYLOAD.GET_STARTED || payload == CONSTANTS.PAYLOAD.CHOOSE_TEST) {
    return quickReplyUtils.quickReplies(
      senderID,
      "Pick a test that you want:",
      ["Toeic 1", "Toeic 2"],
      ["testone", "testtwo"]
    );
  }
}

// Start server
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
  persistentMenu.persistentMenu().then(res => {
    console.log("Persistentmenu loaded!");
  });
});
module.exports = app;
