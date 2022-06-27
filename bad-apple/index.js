const fetch = require('node-fetch')
const cipher = require('rot13-cipher')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    // input code
    const code = "badapples123"
    context.log(code);
    const resp = await getSecret(context, code)
    context.log(resp)
    const responseJson = JSON.stringify(resp);
    context.log(responseJson);
    const secret = responseJson.secret;
    context.log(secret);
    const encoded = cipher(secret);
    context.log(encoded);

    const adminKey = await getKey(context, encoded);

    context.res = {
        // status: 200, /* Defaults to 200 */
        key: adminKey
    };
}

async function getSecret(context, code) {
    // get response 
    const resp = await fetch(`https://b4d4ppl3s.herokuapp.com/api/code`, {
        method: "GET",
        key: code,
    });

    return resp;
}


async function getKey(context, encoded) {
    const adminKey = await fetch("https://b4d4ppl3s.herokuapp.com/api/unlock", {
        method: "POST",
        body: {
            "code": encoded,
        }
    });
    return adminKey
}