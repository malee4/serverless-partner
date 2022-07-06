// bring in npm packages
const multipart = require("parse-multipart");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // get the header type
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var body = req.body;

    var responseMessage = ""; // message to be returned to user
    var fileName = "superSecretFile"

    // if nothing is passed
    try {
        // parse the body
        const parsedBody = multipart.Parse(body, boundary);

        // call the uploadFile function
        responseMessage = await uploadFile(parsedBody, fileName);

    } catch(err) {
        context.log(err);
        context.log("Undefined body image");
        responseMessage = "Sorry! No file attached. File not successfully saved."
    }

    context.res = {
        body: responseMessage
    };
}


// background function, sends file over
async function uploadFile(parsedBody, fileName) {
    // "reference to the container"
    // gets the opening to interact with client
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    // the actual client used to interact with the container
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    // create the blob
    const blobName = `${fileName}.${ext}`;    // ext = extension
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    // upload the file
    const uploadBlogResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);
    return "File Saved Successfully";
}