
const faunadb = require('faunadb');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  const id = event.queryStringParameters.id;


  client.query(
    q.Get(q.Ref(q.Collection("lollies"), id))
  ).then((response) => {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data)
    });
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });

}
