const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8");
const linesSplit = input.split(os.EOL);

let numLine = 0;
let cargoIndex = [];
let containers = [];

while (true) {
    if (!isNaN(parseInt(linesSplit[numLine].at(1)))) {
        break;
    } else {
        numLine++;
    }
}

linesSplit[numLine].trim().split(" ").forEach(function (e, i) {
    e = e.trim();
    if (!isNaN(parseFloat(e))) {
        cargoIndex.push(linesSplit[numLine].indexOf(e));
    }
});

cargoIndex.forEach(function (cIndex) {

    const column = [];

    for (let i = numLine - 1; i >= 0; i--) {

        if (linesSplit[i].at(cIndex) !== " " && linesSplit[i].at(cIndex) !== undefined) {
            column.push(linesSplit[i].at(cIndex));
        } else {
            break; // exit on empty line
        }
    }
    containers.push(column);
});

for (let intructionIndex = numLine + 2; intructionIndex < linesSplit.length; intructionIndex++) {

    const instruction = linesSplit[intructionIndex];

    if (instruction.trim().length === 0) {
        break;
    }

    let count = parseInt(instruction.substring(instruction.indexOf("move") + "move".length, instruction.indexOf("from")).trim());
    let from = parseInt(instruction.substring(instruction.indexOf("from") + "from".length, instruction.indexOf("to")).trim()) - 1;
    let to = parseInt(instruction.substring(instruction.indexOf("to") + "to".length, instruction.lengths).trim()) - 1;

    const steps = [...Array(count)];

    for (const k in steps) {
        containers[to].push(containers[from][containers[from].length - 1]);
        containers[from].splice(containers[from].length - 1, 1);
    }
}

let resultText = "";

containers.forEach(function (column) {

    if (column.length > 0) {
        resultText += column[column.length - 1];
    }
})

fs.writeFileSync("./test1.out", resultText.toString(), "utf8");