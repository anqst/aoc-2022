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
    grid.push(row);
});

const firstLastRow = Array(grid[0].length).fill(-1);
grid.unshift(firstLastRow);

console.log(grid)

for (let y = 2; y < grid.length - 1; y++) { // y axis

    for (let x = 2; x < grid[0].length - 1; x++) { // x axis

        const current = grid[y][x];
        // console.log(current);

        let visible = false;

        if (current > grid[0][x]) { // up
            grid[0][x] = current;
            visible = true;
        }

        if (current > grid[y][0]) { // left
            grid[y][0] = current;
            visible = true;
        }

        // somehow loop through down + right records
        // i had have it wrong

        for (let i = y + 1; i < grid.length; i++) { // down
            if (grid[i][x] >= current) {
                visible = true;
            }
        }

        for (let j = x + 1; j < grid[0].length; j++) { // right
            if (grid[x][j] >= current) {
                visible = true;
            }
        }

        if (visible === true) {
            total++;
        }
    }
}

console.log(grid)
fs.writeFileSync("./test1.out", total.toString(), "utf8");