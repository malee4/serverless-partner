const fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const jokesEndpoint = "https://api.jokes.one/jod";

    // should get it in the form of a json
    let resp = await fetch(jokesEndpoint, {
        "method": "GET",
        headers: {
            'Content-type': "application/json",
            "X-JokesOne-Api-Secret": "melodyweek4"
        }
    });
    


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: resp
    };
}