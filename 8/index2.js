const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();

const grid = [];
let scenicScore = 0;

input.split(os.EOL).forEach(function (e) {

    let row = e.split("");

    row = row.map(function (e) {
        return parseInt(e);
    });
    grid.push(row);
});

let current, scores, finalTreeScore;

for (let y = 0; y < grid.length; y++) { // y axis

    for (let x = 0; x < grid[0].length; x++) { // x axis

        scores = [0, 0, 0, 0];

        current = grid[y][x];

        for (let i = y + 1; i < grid.length; i++) { // down
            scores[0]++;
            if (grid[i][x] >= current) {
                break;
            }
        }

        for (let j = x + 1; j < grid[0].length; j++) { // right
            scores[1]++;
            if (grid[y][j] >= current) {
                break;
            }
        }

        for (let k = y - 1; k >= 0; k--) { // up
            scores[2]++;
            if (grid[k][x] >= current) {
                break;
            }
        }

        for (let m = x - 1; m >= 0; m--) { // left
            scores[3]++;
            if (grid[y][m] >= current) {
                break;
            }
        }

        finalTreeScore = scores.reduce(function (prev, curr) {
            return prev *= curr;
        }, 1);

        if (finalTreeScore > scenicScore) {
            scenicScore = finalTreeScore;
        }
    }
}

fs.writeFileSync("./test2.out", scenicScore.toString(), "utf8");