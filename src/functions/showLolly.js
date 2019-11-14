const faunadb = require('faunadb');
const pageTemplate = require('./lollyTemplate.js');

require('dotenv').config();

// setup and auth the Fauna DB client
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  // get the lolly ID from the request
  try {
    const path = event.queryStringParameters.id.replace("/", "");

    // find the lolly data in the DB
    client.query(
      q.Get(q.Match(q.Index("lolly_by_path"), path))
    ).then((response) => {

      // if found return a view
      return callback(null, {
        statusCode: 200,
        body: pageTemplate(response.data)
      });

    }).catch((error) => {

      // not found or an error, send to the generic error page
      console.log('Error:', error);
      return callback(null, {
        body: JSON.stringify(error),
        statusCode: 301,
        headers: {
          Location: `/melted/index.html`,
        }
      });
    });

  }
  catch (error) {
    console.log('Error getting query paramters :', error);
    return callback(error, {
      body: JSON.stringify(error),
      statusCode: 500
    })
  }


}
