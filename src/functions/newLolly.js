const faunadb = require('faunadb');
const shortid = require('shortid');

require('dotenv').config();

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})


/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {


  const data = JSON.parse(event.body);
  data.lollyPath = shortid.generate();
  // const data = {
  //   "lollyPath": shortid.generate(),
  //   "recipientName": "Flip",
  //   "from": "A friend",
  //   "lollyType": "fab",
  //   "message": "Sending you some more sugar"
  // };
  const lolly = {
    data: data
  };
  /* construct the fauna query */
  client.query(q.Create(q.Ref('classes/lollies'), lolly))
    .then((response) => {
      console.log('success', response);
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
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
