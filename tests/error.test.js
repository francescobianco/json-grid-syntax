
const extractAsGrid = require('../src/json-grid-syntax');

test('column error', () => {
    expect(() => {
        extractAsGrid({}, "b-r-a-n-c-h.*.n-a-m-e")
    }).toThrow("Invalid column expansion, replace with: b-r-a-n-c-h > *.n-a-m-e");
});
