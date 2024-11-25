
const extractAsGrid = require('../src/json-grid-syntax');

test('empty string', () => {
    const inputJson = {name: "Santa", surname: "Claus"}
    const outputGrid = extractAsGrid(inputJson, "")

    expect(outputGrid).toStrictEqual([
        ['{"name":"Santa","surname":"Claus"}']
    ]);
});
