
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

test('key value expand with mixed layout', () => {
    const inputJson = {
        people: [
            {
                parents: [
                    {
                        n: "A",
                        e: "C",
                    }
                ]
            }
        ],
        invoice: {
            t: "B"
        }
    };

    const outputGrid = extractAsGrid(
        inputJson,
        "people.0.parents.0 > #, invoice > #; " +
        "invoice > #, people.0.parents.0 > #; " +
        "people.0.parents.0 > #, invoice > #; " +
        "invoice > #, people.0.parents.0 > #"
    )

    expect(outputGrid).toStrictEqual([
        [ 'n', 'A', 't', 'B' ],
        [ 'e', 'C' ],
        [ 't', 'B', 'n', 'A' ],
        [ undefined, undefined, 'e', 'C' ],
        [ 'n', 'A', 't', 'B' ],
        [ 'e', 'C' ],
        [ 't', 'B', 'n', 'A' ],
        [ undefined, undefined, 'e', 'C' ]
    ]);
});
