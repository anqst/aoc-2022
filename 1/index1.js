const os = require("os");
const fileman = require("../fileman");

fileman.readTextFromFile("./test1.in").then(function (input) {

    let maxVal = 0;

    const elves = input.trim().split(os.EOL + os.EOL);
    elves.forEach(function (elf) {

        const calories = elf.trim().split(os.EOL);

        let val = calories.reduce(function (prev, curr) {
            return prev += parseInt(curr);
        }, 0)

        if (val >= maxVal) {
            maxVal = val;
        }
    })

    fileman.writeTextToFile("./test1.out", maxVal.toString()).catch(function (err) {
        console.log(err);
    })

}).catch(function (err) {
    console.log(err);
});
