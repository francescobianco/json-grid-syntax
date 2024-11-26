
const extractAsGrid = require('../src/json-grid-syntax');

const inputJson = {
    people: [
        {
            parents: [
                {
                    n: "A",
                    e: "C",
                    //age: 99
                }
            ]
        }
    ],
    invoice: {
        //owner: 1,
        t: "B"
    }
}

const outputGrid = extractAsGrid(inputJson,
    "people.0.parents.0 > #, invoice > #; " +
    "invoice > #, people.0.parents.0 > #; " +
    "people.0.parents.0 > #, invoice > #; " +
    "invoice > #, people.0.parents.0 > #"
);

console.log(outputGrid)
