const faunadb = require('faunadb');
const shortid = require('shortid');
const querystring = require('querystring');

require('dotenv').config();

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})


/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {


  const uniquePath = shortid.generate();
  const data = querystring.parse(event.body);
  data.lollyPath = uniquePath;
  // console.log('data :', event.body);


  // const data = {
  //   "lollyPath": uniquePath,
  //   "recipientName": "Flip",
  //   "from": "A friend",
  //   "lollyType": "fab",
  //   "message": "Sending you some more sugar"
  // };
  const lolly = {
    data: data
  };

  console.log('lolly :', lolly);


  /* construct the fauna query */
  client.query(q.Create(q.Ref('classes/lollies'), lolly))
    .then((response) => {
      console.log('success', response);
      /* Success! return the response with statusCode 200 */

      return callback(null, {
        body: JSON.stringify(response),
        statusCode: 301,
        headers: {
          Location: `https://vlolly.netlify.com/lolly/fetch?id=${uniquePath}`,
        }
      });
    }).catch((error) => {
      console.log('error', error);
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      });
    });
}
