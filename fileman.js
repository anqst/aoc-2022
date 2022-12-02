const fs = require('fs');

function readTextFromFile(filePath, encoding = "utf8") {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, encoding, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function writeTextToFile(filePath, message, encoding = "utf8") {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, message, encoding, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });

}

module.exports = {
    "readTextFromFile": readTextFromFile,
    "writeTextToFile": writeTextToFile
}