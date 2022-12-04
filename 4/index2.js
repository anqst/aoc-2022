const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8");
const pairs = input.trim().split(os.EOL);

let total = 0;

pairs.forEach(function (pair) {

    const pairArr = [];
    const checkedIndexPair = [];

    pair.split(",").forEach(function (elf) {
        pairArr.push([parseInt(elf.split("-")[0]), parseInt(elf.split("-")[1])]);
    });

    for (let i = 0; i < pairArr.length; i++) {

        for (let y = 0; y < pairArr.length; y++) {

            if (((pairArr[i][0] >= pairArr[y][0] && pairArr[i][0] <= pairArr[y][1]) || (pairArr[i][1] <= pairArr[y][1] && pairArr[i][1] >= pairArr[y][0])) && i !== y && checkedIndexPair.indexOf(`${Math.min(i, y)}-${Math.max(i, y)}`) === -1) {
                total += 1;
                checkedIndexPair.push(`${Math.min(i, y)}-${Math.max(i, y)}`)
            }
        }
    }
});

fs.writeFileSync("./test2.out", total.toString(), "utf8");