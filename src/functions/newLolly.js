
const querystring = require('querystring');


exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  console.log('params :', params);

  const name = params.recipientname || "World";

  return {
    statusCode: 200,
    body: `Hello, ${name}`
  };
};

// import querystring from "querystring";
// // const fetch = require("node-fetch");
// exports.handler = async function(event, context) {


//      // Only allow POST
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//   }

//   // When the method is POST, the name will no longer be in the event’s
//   // queryStringParameters – it’ll be in the event body encoded as a query string
//   const params = querystring.parse(event.body);
//   console.log('params :', params);

//   // const name = params.name || "World";

//   return {
//     statusCode: 301,
//     body: "redirect",
//     headers: {
//       Location: '/lolly/1234',
//     }
//   };

//   // try {
//   //   const response = await fetch("https://icanhazdadjoke.com", {
//   //     headers: { Accept: "application/json" }
//   //   });
//   //   if (!response.ok) {
//   //     // NOT res.status >= 200 && res.status < 300
//   //     return { statusCode: response.status, body: response.statusText };
//   //   }
//   //   const data = await response.json();

//   //   return {
//   //     statusCode: 200,
//   //     body: JSON.stringify({ msg: data.joke })
//   //   };

//   // } catch (err) {
//   //   console.log(err); // output to netlify function log
//   //   return {
//   //     statusCode: 500,
//   //     body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
//   //   };
//   // }
// };
