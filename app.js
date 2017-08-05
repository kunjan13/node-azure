console.log('azure framework log');
var blobStorage = require('./azure-framework/azure-storage/blob-storage');

var containerOptions = { containerName : "myfirst-container"};

var data = blobStorage.createContainerIfNotExists(containerOptions, function(returnValue){
    console.log('from app.js');
    console.log(returnValue);
});

console.log("calling upload blob");
var myfirstBlob = "myFirstBlob";
// upload my first block blob
var data = blobStorage.createBlockBlobFromLocalFile(containerOptions.containerName,  myfirstBlob, './test.txt', function(returnValue){
    console.log('from app.js for uploading blob');
    console.log(returnValue);
});

var myfirstAppendBlob = "myFirstAppendBlob";
var data = blobStorage.createAppendBlobFromLocalFile(containerOptions.containerName,  myfirstAppendBlob, './test.txt', function(returnValue){
    console.log('from app.js for uploading Append blob');
    console.log(returnValue);

        var appendBlob = blobStorage.appendFromLocalFile(containerOptions.containerName, myfirstAppendBlob, './test2.txt', function(returnValue){
        console.log('append of blob completed');
        console.log(returnValue);
    });

    var listOfBlobs = blobStorage.listBlobsSegmented(containerOptions.containerName, function(returnValue){
        console.log(returnValue)
    });

});




