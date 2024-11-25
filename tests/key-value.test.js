
const extractAsGrid = require('../src/json-grid-syntax');

test('key value expand', () => {
    const inputJson = {
        name: "Santa",
        surname: "Claus"
    }

    const outputGrid = extractAsGrid(inputJson, "#")

    expect(outputGrid).toStrictEqual([
        ["name", "Santa"],
        ["surname", "Claus"]
    ]);
});

test('key value expand on branch', () => {
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
    };

    const outputGrid = extractAsGrid(inputJson, "people.0.parents.0 > #")

    expect(outputGrid).toStrictEqual([
        ["name", "Santa"],
        ["surname", "Claus"]
    ]);
});
