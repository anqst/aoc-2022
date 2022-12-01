const fs = require('fs');
const os = require('os');

function readTextFromFile(filePath) {

    return new Promise(function (resolve, reject) {

        fs.readFile(filePath, "utf8", function (err, data) {

            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

readTextFromFile("./test1.in").then(function (input) {

    let maxVal = 0;

    const elfs = input.trim().split(os.EOL + os.EOL);
    elfs.forEach(function (elf) {

        const calories = elf.trim().split(os.EOL);

        let val = calories.reduce(function (prev, curr) {
            return prev += parseInt(curr);
        }, 0)

        if (val >= maxVal) {
            maxVal = val;
        }
    })

    fs.writeFile("./test1.out", maxVal.toString(), "utf8", function (err) {

        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    })

}).catch(function (err) {
    console.log(err);
})
