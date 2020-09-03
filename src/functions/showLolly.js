const faunadb = require('faunadb');
const pageTemplate = require('./lollyTemplate.js');
const languageStrings = require('../site/_data/strings.json');


require('dotenv').config();

// setup and auth the Fauna DB client
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  // get the lolly ID from the request
  const path = event.queryStringParameters.id.replace("/", "");

  // localize some strings
  const lang = event.queryStringParameters.lang;


  // find the lolly data in the DB
  client.query(
    q.Get(q.Match(q.Index("lolly_by_path"), path))
    ).then((response) => {

    const templateData = Object.assign(response.data, {'localize': languageStrings[lang] })

    // if found return a view
    return callback(null, {
      statusCode: 200,
      body: pageTemplate(templateData)
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
