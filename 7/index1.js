const os = require("os");
const fs = require("fs");
const input = fs.readFileSync("./input.in", "utf8").trim();

const metadata = { "/": { "size": 0 } };

let path = [];
const directoryTree = {};
let currentDirectory = directoryTree;

function getMetadataPath(directoryPath) {
    return `/${directoryPath.join("/")}`;
}

function getCurrentDirectory(path) {

    let currentDirectory = directoryTree;

    path.forEach(function (key) {
        currentDirectory = currentDirectory[key];
    })
    return currentDirectory;
}


let firstArg, secondArg, thirdArg;

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

        case "dir": // new directory
            if (currentDirectory[secondArg] === undefined) {
                currentDirectory[secondArg] = {};
                metadata[getMetadataPath([...path, secondArg])] = { "size": 0 };
            }
            break;

        default: // new file
            currentDirectory[secondArg] = parseInt(firstArg);
            let xPath = [...path]; // clone path - do not reference it

            path.forEach(function () {
                metadata[getMetadataPath(xPath)].size += parseInt(firstArg);
                xPath.pop();
            })
            metadata[getMetadataPath([])].size += parseInt(firstArg);
    }
});


// debug
fs.writeFileSync("./directoryTree.json", JSON.stringify(directoryTree), "utf8");
fs.writeFileSync("./metadata.json", JSON.stringify(metadata), "utf8");


// final calculation
let total = 0;

Object.entries(metadata).forEach(function ([key, value]) {

    value = value["size"];

    if (value <= 100000) {
        total += value;
    }
});

fs.writeFileSync("./test1.out", total.toString(), "utf8");