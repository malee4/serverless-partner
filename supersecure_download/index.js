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
    let accountName = "melodybitstorageaccount";
    let blobStorageName = "images"
    let download = `https://${accountName}.blob.core.windows.net/${images}/${fileName}`;

    // check password
    if (password == myPassword) {
        context.log("Password correct");


        // check if file exists
        let resp = await fetch(download, {
            method: 'GET',
        })
        let data = await resp;

        if (data.statusText == "The specified blob does not exist.") {
            responseMessage = "File does not exist."
        }

    } else {
        responseMessage = "Invalid Password."
    }


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            "downloadUri": download,
            "success": responseMessage
        }
    };
}