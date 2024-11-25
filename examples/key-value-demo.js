
const extractAsGrid = require('../src/json-grid-syntax');

const inputJson = {
    people: [
        {
            parents: [
                {
                    name: "Santa",
                    surname: "Claus"
                }
            ]
        }
    ],
    invoice: {
        owner: 1,
        title: "Spare Toys co."
    }
}

const outputGrid = extractAsGrid(inputJson, "people.0.parents.0 > #, invoice > #")

console.log(outputGrid)
