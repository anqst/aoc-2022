const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();

const grid = [];
let total = 0;

input.split(os.EOL).forEach(function (e) {

    let row = e.split("");

    row = row.map(function (e) {
        return parseInt(e);
    });
    grid.push(row);
});

total += grid.length * 2 + (grid[0].length - 2) * 2 // edges

let current, visible, downArray, rightArray;

for (let y = 1; y < grid.length - 1; y++) { // y axis

    for (let x = 1; x < grid[0].length - 1; x++) { // x axis

        downArray = [];
        rightArray = [];

        current = grid[y][x];
        visible = false;

        if (current > grid[0][x]) { // up
            grid[0][x] = current;
            visible = true;
        }

        if (current > grid[y][0]) { // left
            grid[y][0] = current;
            visible = true;
        }

        for (let i = y + 1; i < grid.length; i++) { // down
            downArray.push(grid[i][x]);
        }

        for (let j = x + 1; j < grid[0].length; j++) { // right
            rightArray.push(grid[y][j]);
        }

        if (current > Math.max(...downArray) || current > Math.max(...rightArray)) {
            visible = true;
        }

        if (visible === true) {
            total++;
        }
    }
}

fs.writeFileSync("./test1.out", total.toString(), "utf8");