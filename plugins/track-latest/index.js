const faunadb = require('faunadb');
const fs = require('fs');

require('dotenv').config();
const { FAUNADB_SERVER_SECRET} = process.env
const lollyDataFile = process.cwd() + '/src/site/_data/lollies.json';
const lastLollyRef = process.cwd() + '/src/site/_data/last.json';

const q = faunadb.query;
const client = new faunadb.Client({
  secret: FAUNADB_SERVER_SECRET
});

const saveFile = async function(path, data) {
  await fs.writeFile( path, data, err => {
    if(err) {
      console.error(err);
    } else {
      console.log(`Data saved: ${path}`);
    }
  });
}

module.exports = {

  async onPreBuild({ utils, constants }) {

    // restore the timestamp of the most recent lolly page from the cache
    if( await utils.cache.has( lastLollyRef )) {
      await utils.cache.restore( lastLollyRef );
      console.log('Restored a previous timestamp from cache :>> ', lastLollyRef);
    } else {
      await saveFile( lastLollyRef, JSON.stringify({ "ts": 0 }) );
    }

    // Fetch all the lolly data from the database
    await client.query( q.Paginate(q.Match(q.Ref("indexes/all_lollies")),{size:100000}) )
      .then(async (response) => {
        const lollies = response.data;
        const getAllDataQuery = lollies.map((ref) => {
          return q.Get(ref);
        });
        await client.query(getAllDataQuery).then(async (allLollies) => {
          await saveFile( lollyDataFile, JSON.stringify(allLollies) );
        });
      })
      .catch((error) => {
        console.error("error", error);
      });

      // Reinstate previously build and cached pages
      if( await utils.cache.has( `${constants.PUBLISH_DIR}/lolly`) ) {
        await utils.cache.restore( `${constants.PUBLISH_DIR}/lolly`);
      }

  },


  async onPostBuild({ utils, constants }) {
    // cache the lolly pages and the timestamp of the most recent lolly
    const lollies = require(lollyDataFile);
    await saveFile( lastLollyRef, JSON.stringify({ "ts": lollies[lollies.length-1].ts }) );
    await utils.cache.save( lastLollyRef );
    await utils.cache.save( `${constants.PUBLISH_DIR}/lolly`);
  }

}


