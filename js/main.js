const dictionary = [
    "HELLO",
    "WORLD",
    "APPLE",
    "GRAPE",
    "LEMON",
    "GREEN",
    "BROWN",
    "WHITE",
    "BLACK",
    "TIGER",
    "MOUSE",
    "THREE",
    "SEVEN",
    "EIGHT",
    "WATER",
    "SUNNY",
    "WINDY",
];

let answer = dictionary[getRandomIndex()];

function getRandomIndex() {
    return Math.floor(Math.random() * dictionary.length);
}

function setAnswer() {
    answer = dictionary[getRandomIndex()]
}