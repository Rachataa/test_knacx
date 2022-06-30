let ans = "ABCD";
let ran = "AAAA"

let answers = ans.split("");
let random = ran.split("");

let correctPosition = 0;
let correctletter = 0;
let curentletter = [];

for (let i = 0; i < random.length; i++) {
    if (answers.includes(random[i])) {
        if (!curentletter.includes(random[i])) {
            curentletter.push(random[i])
            correctletter++
        }
        if (random[i] === answers[i]) {
            correctPosition++
        }
    }
}

let result = { ran, correctletter, correctPosition }
console.log(result);