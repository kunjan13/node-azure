var azureBlobStorage = require('azure-storage');
var dotenv = require('dotenv');

if(process.NODE_ENV === 'Dev')
    {
        dotenv.config('./dev.env');
    }
else if (process.NODE_ENV === 'local')
    {
        dotenv.config('./local.env');
    }
else
    {
        dotenv.config({path : 'local.env'});
    }

console.log(process.env.AZURE_STORAGE_ACCESS_KEY);
var blobService = azureBlobStorage.createBlobService();

function createContainerIfNotExists(containerOptions, callback)
{    
    var containerName;
    
    if(!containerOptions || !containerOptions.containerName)
        {
            throw new Error('options.containerName is required');
        }

    containerName = containerOptions.containerName;
 
    var containerOpts, results = {};

    if(containerOptions.publicAccessLevel)
        {
            containerOpts.publicAccessLevel = containerOptions.publicAccessLevel;
        }

    blobService.createContainerIfNotExists(containerName, function(err, result, response){
        if(!err){
            if(result.created == "false");
            {
                console.log('container already exists');
            }
            console.log('log from framework');
            callback(result);    
        }
        else{
        throw new Error('error creating container: ' + err);
        }
    });
}

function createBlockBlobFromLocalFile(containerName, blobName, filePath, callback)
{
    blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, function(err, result, response){
        if(!err){
            //file uploaded
            callback(result);
        }
    });
}

function createAppendBlobFromLocalFile(containerName, blobName, filePath, callback)
{
    blobService.createAppendBlobFromLocalFile(containerName, blobName, filePath, function(err, result, response){
        if(!err){
            //file uploaded
            callback(result);
        }
        else
            {
                console.log(err);
            }
    });
}


function appendFromLocalFile(containerName, blobName, filePath, callback)
{
    blobService.appendFromLocalFile(containerName, blobName, filePath, function(err, result, response){
        if(!err){
            //file uploaded
            callback(result);
        }
        else{
            console.log(err);
        }
    });
}

function listBlobsSegmented(containerName, callback)
{
    blobService.listBlobsSegmented(containerName, null, function(err, result, response){
        if(!err)
            {
                callback(result);
                //result.entries contains the entries
                // if not all blobs were returned, result.continuationToken has the continuation token.
            }
    });    
}

module.exports.createContainerIfNotExists = createContainerIfNotExists;
module.exports.createBlockBlobFromLocalFile = createBlockBlobFromLocalFile;
module.exports.appendFromLocalFile = appendFromLocalFile;
module.exports.createAppendBlobFromLocalFile = createAppendBlobFromLocalFile;
module.exports.listBlobsSegmented = listBlobsSegmented;