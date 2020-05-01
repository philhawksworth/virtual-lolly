const faunadb = require('faunadb');
const chalk = require('chalk');
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
      console.log(chalk.yellow('Data saved:'), path);
    }
  });
}

module.exports = {

  async onPreBuild({ utils, constants }) {

    // restore the timestamp of the most recent lolly page from the cache
    if( await utils.cache.has( lastLollyRef )) {
      await utils.cache.restore( lastLollyRef );
      console.log(chalk.green('Restored from build cache'), '- previous timestamp from cache');
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
        const last = require(lastLollyRef);
        console.log(chalk.green('Restored from build cache'), `Lolly pages prior to ${last.ts}` );
      }

  },


  async onPostBuild({ utils, constants }) {
    // cache the lolly pages and the timestamp of the most recent lolly
    const lollies = require(lollyDataFile);
    const new_ts = lollies[lollies.length-1].ts;
    await saveFile( lastLollyRef, JSON.stringify({ "ts": new_ts }) );
    await utils.cache.save( lastLollyRef );
    console.log(chalk.green('Added to build cache'), `- latest lolly page timestamp: ${new_ts}`);
    await utils.cache.save( `${constants.PUBLISH_DIR}/lolly`);
    console.log(chalk.green('Added to build cache'), '- lolly pages');
  }

}


