const faunadb = require('faunadb');
const shortid = require('shortid');
const querystring = require('querystring');

const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})


/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {

    // get the form data
    const data = querystring.parse(event.body);

    // add a unique path id
    const uniquePath = shortid.generate();
    data.lollyPath = uniquePath;
    const lolly = {
        data: data
    };

    // Create the lolly entry in the fauna db
    client.query(q.Create(q.Ref('classes/lollies'), lolly))
        .then((response) => {
            // Success! Go to a page to view the result
            return callback(null, {
                body: JSON.stringify(response),
                statusCode: 302,
                headers: {
                    Location: `/lolly/${uniquePath}`,
                }
            });
        }).catch((error) => {
            console.error('error', error);
            // Error! return the error with statusCode 400
            return callback(null, {
                statusCode: 400,
                body: JSON.stringify(error)
            });
        });

}