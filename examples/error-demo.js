
const extractAsGrid = require('../src/json-grid-syntax');

const inputJson = {
    events: [
        {
            people: [
                {name: "Santa", surname: "Claus"},
                {name: "Karl", surname: "Kaiser"}
            ]
        }
    ]
}

const outputGrid = extractAsGrid(inputJson, "ciao . * . ")

console.log(outputGrid)
