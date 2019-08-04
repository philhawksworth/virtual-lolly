// const axios  = require('axios');

const faunadb = require('faunadb');
const seed   = require('../../../utils/save-seed.js');

require('dotenv').config();

// var url = `https://www.hawksworx.com/feed.json`;

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
});

module.exports = () => {

  return new Promise((resolve, reject) => {

    client.query(
      q.Paginate(q.Match(q.Ref("indexes/all_lollies")))
    ).then((response) => {
      const lollies = response.data;

      // create new query out of item refs. http://bit.ly/2LG3MLg
      const getAllDataQuery = lollies.map((ref) => {
        return q.Get(ref);
      });
      // then query the refs
      return client.query(getAllDataQuery).then((ret) => {
        seed(JSON.stringify(ret), `${__dirname}/../dev/lollies.json`);
        resolve(ret);
      });
    }).catch((error) => {
      console.log("error", error);
      reject(err);
    });

  })

}


