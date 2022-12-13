const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();

const start = { "x": 0, "y": 0 };
const visitedPositions = [{ ...start }];

const bodyLength = 10;
let body = [];
for (let k = 0; k < bodyLength; k++) {
    body.push({ ...start });
}

function getClosestPoint(point, points) {

    let resultPoint;
    let range, minRange;

    for (let p = 0; p < points.length; p++) {

        range = Math.sqrt(Math.pow((point.x - points[p].x), 2) + Math.pow((point.y - points[p].y), 2));

        if (minRange === undefined || range < minRange) {
            resultPoint = points[p];
            minRange = range;
        }
    }
    return resultPoint;
}

input.split(os.EOL).forEach(async function (move) {

    const direction = move.split(" ")[0];
    const count = parseInt(move.split(" ")[1]);
    let step = { "x": 0, "y": 0 };
    let range;

    switch (direction) {
        case "R":
            step.x = 1;
            break;

        case "L":
            step.x = -1;
            break;

        case "U":
            step.y = 1;
            break;

        case "D":
            step.y = -1;
            break;
    }

    for (let i = 0; i < count; i++) {

        body[0].x += step.x;
        body[0].y += step.y;

        for (let v = 0; v < body.length - 1; v++) {

            range = Math.sqrt(Math.pow(Math.abs(body[v].x - body[v + 1].x), 2) + Math.pow(Math.abs(body[v].y - body[v + 1].y), 2));

            if (range > Math.sqrt(5)) {

                body[v + 1] = { "x": (body[v].x + body[v + 1].x) / 2, "y": (body[v].y + body[v + 1].y) / 2 };

            } else if (range > Math.sqrt(2)) {

                body[v + 1] = getClosestPoint(body[v + 1], [
                    { "x": body[v].x, "y": body[v].y + 1 },
                    { "x": body[v].x, "y": body[v].y - 1 },
                    { "x": body[v].x + 1, "y": body[v].y },
                    { "x": body[v].x - 1, "y": body[v].y }
                ]);
            }
        }

        if (visitedPositions.filter(item => { if (item.x === body[body.length - 1].x && item.y === body[body.length - 1].y) { return item; } }).length === 0) {
            visitedPositions.push({ ...body[body.length - 1] });
        }
    }
});

fs.writeFileSync("./test2.out", (visitedPositions.length).toString(), "utf8");