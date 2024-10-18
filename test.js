// SEND TEMPLATE SMS
const axios = require('axios');
const data = {"sender": "Arkesel",
            "message": "Hello <%name%>, safe journey to <%hometown%> this Xmas",
            "recipients": [
              "233553995047" = ["name" = "John Doe", "hometown" = "Techiman"],
              "233544919953" = ["name" = "Adam", "hometown" = "Cape Coast"],
            ]
            };
const config = {
  method: 'post',
  url: 'https://sms.arkesel.com/api/v2/sms/template/send',
  headers: {
  'api-key': 'cE9QRUkdjsjdfjkdsj9kdiieieififiw='
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
