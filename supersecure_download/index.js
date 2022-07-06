// const multipart = require("parse-multipart");
// const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
// const { BlobServiceClient } = require("@azure/storage-blob");
const fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var responseMessage = "";
    // valid password
    const myPassword = "hello";

    // get password
    var password = req.query.password;
    context.log(password)

    // get file name, assume fileName has file extension
    const fileName = req.query.file;
    let download = "https://melodybitstorageaccount.blob.core.windows.net/images/" + fileName;

    // check password
    if (password == myPassword) {
        context.log("Password correct");

        try {
            // check if file exists
            
            // return link to download file, if file exists

        } catch(err) {

        }

    } else {
        responseMessage = "Invalid Password."
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}