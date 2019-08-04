
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

    // if found return a view
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });

  }).catch((error) => {
    return callback(null, {
      statusCode: 301,
      body: "Not found",
      headers: {
        Location: 'https://vlolly.netlify.com/melted',
      }
    });
  });

}
