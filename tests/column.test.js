
const extractAsGrid = require('../src/extractAsGrid');

test('column expand', () => {
    const inputJson = [
        {name: "Santa", surname: "Claus"},
        {name: "Karl", surname: "Kaiser"}
    ]

    const outputGrid = extractAsGrid(inputJson, "*.name")

    expect(outputGrid).toStrictEqual([
        ["Santa"],
        ["Karl"]
    ]);
});

test('column expand on branch', () => {
    const inputJson = {
        events: [
            {
                people: [
                    {name: "Santa", surname: "Claus"},
                    {name: "Karl", surname: "Kaiser"}
                ]
            }
        ]
    };

    const outputGrid = extractAsGrid(inputJson, "events.0.people > *.surname, *.name")

    expect(outputGrid).toStrictEqual([
        ["Claus", "Santa"],
        ["Kaiser", "Karl"]
    ]);
});
