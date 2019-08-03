/* code from functions/todos-read-all.js */
// import faunadb from 'faunadb'
const faunadb = require('faunadb');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = (event, context, callback) => {
  client.query(
    q.Paginate(q.Match(q.Ref("indexes/all_lollies")))
  ).then((response) => {
    const lollies = response.data;

    console.log('lollies :', lollies);

    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllDataQuery = lollies.map((ref) => {
      return  q.Get(ref);;
    });
    // then query the refs
    return client.query(getAllDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      });
    });
  }).catch((error) => {
    console.log("error", error);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    });
  });
}
