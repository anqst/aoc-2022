const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();

const metadata = { "/": { "size": 0, "totalFiles": 0 } };
const directoryTree = {};

function getMetadataPath(directoryPath) {
    return `/${directoryPath.length > 0 ? (directoryPath.join("/") + "/") : ""}`;
}

function getCurrentDirectory(path) {

    let currentDirectory = directoryTree;

    path.forEach(function (key) {
        currentDirectory = currentDirectory[key];
    })
    return currentDirectory;
}

let firstArg, secondArg, thirdArg;
let path = [];
let currentDirectory = directoryTree;

input.split(os.EOL).forEach(function (command) {

    command = command.trim();
    firstArg = command.split(" ")[0].trim();
    secondArg = command.split(" ")[1].trim();

    switch (firstArg.toLowerCase()) {

        case "$": // cd or ls

            switch (secondArg.toLowerCase()) {
                case "ls":
                    break;

                case "cd":
                    thirdArg = command.split(" ")[2].trim();

                    if (thirdArg === "/") {
                        path = [];
                    } else if (thirdArg === "..") {
                        path.pop();
                    } else {
                        path.push(thirdArg);
                    }
                    currentDirectory = getCurrentDirectory(path);
                    break;
            }

            break;

        case "dir":
            if (currentDirectory[secondArg] === undefined) { // new directory
                currentDirectory[secondArg] = {};
                metadata[getMetadataPath([...path, secondArg])] = { "size": 0, "totalFiles": 0 };
            }
            break;

        default:
            if (currentDirectory[secondArg] === undefined) { // new file

                currentDirectory[secondArg] = parseInt(firstArg);
                let xPath = [...path]; // clone path - do not reference it

                for (let i = 0; i < path.length + 1; i++) {

                    // console.log(JSON.stringify(xPath) + " : " + secondArg); // debug

                    metadata[getMetadataPath(xPath)].size += parseInt(firstArg);
                    metadata[getMetadataPath(xPath)].totalFiles += 1;

                    if (xPath.length > 0) {
                        xPath.pop();
                    }
                }
            }
            break;
    }
});


// debug
fs.writeFileSync("./directoryTree.json", JSON.stringify(directoryTree), "utf8");
fs.writeFileSync("./metadata.json", JSON.stringify(metadata), "utf8");


// final calculation
const needToFree = metadata["/"].size - (70000000 - 30000000);
let closestHigher = -1;

Object.entries(metadata).forEach(function ([key, value]) {

    if (value["size"] >= needToFree && Math.abs(value["size"] - needToFree) < Math.abs(closestHigher - needToFree)) {
        closestHigher = value["size"];
    }
});

fs.writeFileSync("./test2.out", closestHigher.toString(), "utf8");