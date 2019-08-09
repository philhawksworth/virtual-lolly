
const faunadb = require('faunadb');
const pageTemplate = require('./lollyTemplate.js');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  console.log('id :', event.queryStringParameters.id);

  const path = event.queryStringParameters.id.replace("/", "");

  client.query(
    q.Get(q.Match(q.Index("lolly_by_path"), path))
  ).then((response) => {

    // if found return a view
    return callback(null, {
      statusCode: 200,
      body:  pageTemplate(response.data)
    });

  }).catch((error) => {
    return callback(null, {
      body: JSON.stringify(error),
      statusCode: 301,
      headers: {
        Location: `https://vlolly.net/melted`,
      }
    });
  });

}
