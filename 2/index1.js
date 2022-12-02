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
        "C": "scissors",
        "X": "rock",
        "Y": "paper",
        "Z": "scissors"
    };

    const rounds = input.trim().split(os.EOL);
    let total = 0;

    rounds.forEach(function (round) {

        const oponentSymbol = representations[round.split(" ")[0]];
        const mySymbol = representations[round.split(" ")[1]];

        total += options.indexOf(mySymbol) + 1;

        if (options.indexOf(mySymbol) === options.indexOf(oponentSymbol)) { // draw
            total += 3;
        } else {
            if ((options.indexOf(mySymbol) === options.indexOf(oponentSymbol) + 1)
                ||
                (options.indexOf(mySymbol) === 0 && options.indexOf(oponentSymbol) + 1 === options.length)) // I won
            {
                total += 6;
            } // else -> oponent won
        }
    });

    fileman.writeTextToFile("./test1.out", total.toString()).catch(function (err) {
        console.log(err);
    });

}).catch(function (err) {
    console.log(err);
});