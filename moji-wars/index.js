const translator = require('emoji-translator')


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const redacted = req.query.redacted;
    const vocabulary = {'🕵🏽': 'John', '🕵🏻‍♀️': 'Nora', '🗻': 'Waverly Valley Place'}
    const translate = translator(vocabulary)

    let code = "";
    if (typeof redacted === 'undefined' || redacted === "") {
        code = "Pls enter text to convert" 
    } else {
        code = translate(redacted);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}