
const faunadb = require('faunadb');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  const path = event.queryStringParameters.id;

  client.query(
    q.Get(q.Match(q.Index("lolly_by_path"), path))
  ).then((response) => {

    console.log('status :', response.requestResult.statusCode);

    // if not found, redirect to the not found page
    if(response.requestResult.statusCode == 404) {
      return callback(null, {
        statusCode: 301,
        headers: {
          Location: 'https://vlolly.netlify.com/melted',
        }
      });
    } else {
      // if found return a view
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data)
      });
    }

  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });

}
