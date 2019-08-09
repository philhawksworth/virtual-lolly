
const faunadb = require('faunadb');
const pageTemplate = require('./lollyTemplate.js');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {

  console.log('event :', event);

  if(event.queryStringParameters.id) {
    console.log('id :', event.queryStringParameters.id.replace("/", ""));
    var path = event.queryStringParameters.id.replace("/", "");
  } else if(event.headers.referer) {
    console.log('lolly :', event.headers.referer.split('/lolly/')[1].replace("/", ""));
    var path = event.headers.referer.split('/lolly/')[1].replace("/", "");
  }

  console.log('path :', path);

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
        Location: `/melted`,
      }
    });
  });

}
