const { debug } = require("console");
const os = require("os");
const fileman = require("../fileman");

fileman.readTextFromFile("./input.in").then(function (input) {

    const options = [
        "rock",
        "paper",
        "scissors"
    ];

    const representations = {
        "A": "rock",
        "B": "paper",
        "C": "scissors"
    };

    const rounds = input.trim().split(os.EOL);
    let total = 0;

    rounds.forEach(function (round) {

        const oponentSymbol = representations[round.split(" ")[0]];
        const dep = round.split(" ")[1];
        let mySymbol;

        if (dep === "Y") { // draw

            total += 3;
            mySymbol = oponentSymbol;

        } else if (dep === "X") { // lose

            if (options.indexOf(oponentSymbol) !== 0) {
                mySymbol = options[options.indexOf(oponentSymbol) - 1];
            } else {
                mySymbol = options[options.length - 1];
            }

        } else if (dep === "Z") { // win

            if (options.indexOf(oponentSymbol) + 1 !== options.length) {
                mySymbol = options[options.indexOf(oponentSymbol) + 1];
            } else {
                mySymbol = options[0];
            }
            total += 6;
        }

        total += options.indexOf(mySymbol) + 1;
    });

    fileman.writeTextToFile("./test2.out", total.toString()).catch(function (err) {
        console.log(err);
    });

}).catch(function (err) {
    console.log(err);
});