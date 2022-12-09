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

    row.unshift(-1);
    row.push(-1);
    grid.push(row);
});

const firstLastRow = Array(grid[0].length).fill(-1);
grid.unshift(firstLastRow);
grid.push(firstLastRow);

for (let y = 1; y < grid.length - 1; y++) { // y axis

    for (let x = 1; x < grid[0].length - 1; x++) { // x axis

        const current = grid[y][x];
        console.log(current);

        let visible = false;

        if (current > grid[0][x]) { // up
            grid[0][x] = current;
            visible = true;
        }

        if (current > grid[grid.length - 1][x]) { // down
            grid[grid.length - 1][x] = current;
            visible = true;
        }

        if (current > grid[y][0]) { // left
            grid[y][0] = current;
            visible = true;
        }

        if (current > grid[y][grid[x].length - 1]) { // right
            grid[y][grid[x].length - 1] = current;
            visible = true;
        }

        if (visible === true) {
            total++;
        }
    }
}

console.log(JSON.stringify(grid))
fs.writeFileSync("./test1.out", total.toString(), "utf8");