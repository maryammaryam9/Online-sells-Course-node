const FCM = require("fcm-node");
// const fcm = new FCM(process.env.SERVER_KEY);
const User = require("../models/user");
const Notification = require("../models/notification");

const axios = require("axios");
const { getAccessToken } = require("./getAccessToken");
const url = "https://fcm.googleapis.com/v1/projects/musab-ed031/messages:send";

module.exports = async (title = "", body = "", _id) => {

  var token = await getAccessToken();
  // console.log("token-----------------------");
  // console.log(token);
  
  await new Notification({ title, body, userId: _id }).save();
  let user = await User.findOne({ _id, status: "1" }, { fcmTokens: 1, _id: 0 });
  console.log(user);
  if (user) {
    let fcms = user.fcmTokens;
    // console.log(fcms);


    fcms.forEach((e) => {
      // Define the data and configuration
      const postData = {
        message: {
          token: e,
          notification: {
            body: body,
            title: title,
          },
        },
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      // Make a POST request with custom headers
      axios
        .post(url, postData, config)
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          // console.error("Error making the API call:", error);
        });
      // fcm.send({ to: e, notification: { title: title, body: body } }, function (err, response) {});
    });







// //old code
//     // for (let i = 0; i < fcms.length; i++)

//     //   fcm.send({
//     //     to: fcms[i],
//     //     notification: { title: title, body }
//     //   }, function (err, response) { 
//     //     console.log(response);
//     //     console.log(err);
//     //   });
  }
};
