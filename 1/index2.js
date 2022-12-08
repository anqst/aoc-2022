const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8");

let values = [];
let total = 0;

const elves = input.trim().split(os.EOL + os.EOL);
elves.forEach(function (elf) {

    const calories = elf.trim().split(os.EOL);

    let val = calories.reduce(function (prev, curr) {
        return prev += parseInt(curr);
    }, 0);

    if (values.length < 3) {

        values.push(val);

    } else {

        const min = Math.min(...values);

        if (val > min) {
            values[values.indexOf(min)] = val;
        }
    }
})

total = values.reduce(function (prev, curr) {
    return prev += curr;
});

fs.writeFileSync("./test2.out", total.toString(), "utf8");