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

  // get the form data
  const data = querystring.parse(event.body);

  // add a unique path id
  const uniquePath = shortid.generate();
  data.lollyPath = uniquePath;
  const lolly = {
    data: data
  };

  // construct the fauna query
  client.query(q.Create(q.Ref('classes/lollies'), lolly))
    .then((response) => {
      console.log('success', response);

      // Success! Go to a paghe to view trhe result
      return callback(null, {
        body: JSON.stringify(response),
        statusCode: 301,
        headers: {
          Location: `https://vlolly.netlify.com/lolly/fetch?id=${uniquePath}&new=true`,
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
