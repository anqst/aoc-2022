const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8");

let alphabet = "abcdefghijklmnopqrstuvwxyz";
alphabet.split("").forEach(function (char) {
    alphabet = alphabet + char.toUpperCase();
})

const backpacks = input.trim().split(os.EOL);
let total = 0;

backpacks.forEach(function (backpack) {

    const partOne = backpack.substr(0, backpack.length / 2).split("");
    const partTwo = backpack.substr(backpack.length / 2, backpack.length / 2).split("");

    let duplicates = [];

    for (const char of partOne) {

        if (partTwo.indexOf(char) !== -1 && duplicates.indexOf(char) === -1) {
            duplicates.push(char);
        }
    }

    total += alphabet.indexOf(duplicates[0]) + 1;
});

fs.writeFileSync("./test1.out", total.toString(), "utf8");