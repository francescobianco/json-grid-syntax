
const extractAsGrid = require('../src/extractAsGrid');

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
    ]
}

const outputGrid = extractAsGrid(inputJson, "people.0.parents.0 > #")

console.log(outputGrid)
