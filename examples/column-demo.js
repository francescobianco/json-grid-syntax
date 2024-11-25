
const extractAsGrid = require('../src/extractAsGrid');

const inputJson = [
    {name: "Santa", surname: "Claus"},
    {name: "Karl", surname: "Kaiser"}
]

const outputGrid = extractAsGrid(inputJson, "*.name")

console.log(outputGrid)
