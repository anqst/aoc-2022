const os = require("os");
const fileman = require("../fileman");

fileman.readTextFromFile("./test1.in").then(function (input) {

    let values = [];
    let total = 0;

    const elves = input.trim().split(os.EOL + os.EOL);
    elves.forEach(function (elf) {

        const calories = elf.trim().split(os.EOL);

        let val = calories.reduce(function (prev, curr) {
            return prev += parseInt(curr);
        }, 0);

        if (values.length < 3) {

            values.push(val);

        } else {

            const min = Math.min(...values);

            if (val > min) {
                values[values.indexOf(min)] = val;
            }
        }
    })

    total = values.reduce(function (prev, curr) {
        return prev += curr;
    });

    fileman.writeTextToFile("./test2.out", total.toString()).catch(function (err) {
        console.log(err);
    });

}).catch(function (err) {
    console.log(err);
});
