const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8");

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

fs.writeFileSync("./test1.out", maxVal.toString(), "utf8");