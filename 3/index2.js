const os = require("os");
const { exit } = require("process");
const fileman = require("../fileman");

fileman.readTextFromFile("./input.in").then(function (input) {

    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach(function (char) {
        alphabet = alphabet + char.toUpperCase();
    })

    const backpacks = input.trim().split(os.EOL);
    let group = [];
    let total = 0;

    let groupCount = 3;
    let i = 0, c = 0;

    while (i < backpacks.length) {

        group.push(backpacks[i + c]);

        if (c === groupCount - 1) {

            let char;
            let includes;

            for (let k = 0; k < group[0].length; k++) {

                includes = true;
                char = group[0][k];

                for (let m = 1; m < groupCount; m++) {
                    if (group[m].includes(char) === false) {
                        includes = false;
                    }
                }

                if (includes === true) {
                    total += alphabet.indexOf(char) + 1;
                    break;
                }
            }

            c = 0;
            i += groupCount;
            group = [];

        } else {
            c++;
        }
    }


    fileman.writeTextToFile("./test2.out", total.toString()).catch(function (err) {
        console.log(err);
    });

}).catch(function (err) {
    console.log(err);
});