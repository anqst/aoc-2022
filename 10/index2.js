const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();
const instructions = input.split(os.EOL);

let X = 1;

let cycle = 0;
let currentLine = 0;
let currentJob = {
    "instruction": null,
    "remainingCycles": 0,
    "functionality": null
};

let evalNum;

while (currentLine < instructions.length) {

    cycle++;

    if (currentJob.instruction === null) { // new instruction

        currentJob.instruction = instructions[currentLine];
        switch (instructions[currentLine].split(" ")[0]) {

            case "noop":
                currentJob.remainingCycles = 1;
                currentJob.functionality = () => { };
                break;

            case "addx":
                currentJob.remainingCycles = 2;
                currentJob.functionality = (num) => { X += num };
                break;
        }
    }

    currentJob.remainingCycles--;

    if (cycle % 40 === 0) {
        // skip to next line on CRT
    }

    if (currentJob.remainingCycles === 0) { // end of instruction

        evalNum = parseInt(instructions[currentLine].split(" ")[1]);
        currentJob.functionality(evalNum);

        currentLine++;
        currentJob.instruction = null;
    }
};
console.log(cycle);

fs.writeFileSync("./test2.out", "".toString(), "utf8");