const faunadb = require('faunadb');
const seed   = require('../../../utils/save-seed.js');

require('dotenv').config();

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

module.exports = () => {
  return new Promise((resolve, reject) => {
    client.query(
      q.Paginate(q.Match(q.Ref("indexes/all_lollies")),{size:100000})
    ).then((response) => {
      const lollies = response.data;

      console.log('Lolly pages to generate:', lollies.length);

      const getAllDataQuery = lollies.map((ref) => {
        return q.Get(ref);
      });
      return client.query(getAllDataQuery).then((ret) => {
        seed(JSON.stringify(ret), `${__dirname}/../dev/lollies.json`);
        resolve(ret);
      });
    }).catch((error) => {
      console.log("error", error);
      reject(error);
    });
  })
}
