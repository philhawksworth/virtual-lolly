const faunadb = require('faunadb');
const pageTemplate = require('./lollyTemplate.js');
const languageStrings = require('./strings.json');
const { builder } = require('@netlify/functions');


// setup and auth the Fauna DB client
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

const handler = async(event) => {

    // get the lolly ID from the request
    let lollyId = event.path.split("lolly/")[1];
    let lang = 'en';
    if (!lollyId) {
        lollyId = event.path.split("popsicle/")[1];
        lang = 'us';
    }

    console.log(`Render lolly ${lollyId}`);
    console.log(`required language strings ${JSON.stringify(languageStrings)}`);

    // find the lolly data in the DB
    return client.query(
        q.Get(q.Match(q.Index("lolly_by_path"), lollyId))
    ).then((response) => {

        const templateData = Object.assign(response.data, { 'localize': languageStrings[lang] });

        console.log(`language strings ${JSON.stringify(languageStrings[lang])}`);

        console.log(`templateData for ${lang} -  ${JSON.stringify(templateData)}`);


        // if found return a view
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html",
            },
            body: pageTemplate(templateData)
        }

    }).catch((error) => {

        // not found or an error, send to the generic error page
        console.log('Error:', error);
        return {
            body: JSON.stringify(error),
            statusCode: 301,
            headers: {
                Location: `/melted/index.html`,
            }
        };
    });

}

// exports.handler = handler;
exports.handler = builder(handler);