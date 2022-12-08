const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();
const charByChar = input.split("");

const mustBeUniqueCount = 14;
let uniquesCount = 0;

for (let i = 0; i < charByChar.length; i++) {

    const char = charByChar[i];
    const nextIndex = charByChar.indexOf(char, i + 1);

    if (nextIndex === -1 || Math.abs(nextIndex - i) >= mustBeUniqueCount - uniquesCount) {
        uniquesCount++;
    } else {
        uniquesCount = 0;
    }

    if (uniquesCount >= mustBeUniqueCount) {
        fs.writeFileSync("./test2.out", (i + 1).toString(), "utf8");
        break;
    }
}