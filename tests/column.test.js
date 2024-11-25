
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
