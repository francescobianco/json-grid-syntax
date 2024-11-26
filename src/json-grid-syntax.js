
function jsonGridSyntax(inputJson, jsonGridSyntax, replacer = null, space = null) {

    function parseJson(inputJson, jsonGridSyntax) {
        jsonGridSyntax = jsonGridSyntax.trim();

        if ([';', ','].includes(jsonGridSyntax[jsonGridSyntax.length - 1])) {
            jsonGridSyntax = jsonGridSyntax.slice(0, -1).trim();
        }

        if (!jsonGridSyntax) {
            return [[ stringifyJson(inputJson) ]];
        }

        if (jsonGridSyntax[0] === '#') {
            return expandKeyValues(inputJson);
        }

        let expansionGrid = [[ ]];

        let branchPrefix = ""
        let selectorGrid = getSelectorGrid(jsonGridSyntax);
        let columnOffset = 0;
        let rowOffset = 0;

        selectorGrid = selectorGrid.map((row, rowIndex) => {
            let maxHeight = 0;

            row = row.map(
                (selector, columnIndex) => {
                    let branch = getSelectorBranch(selector)

                    if (branch) {
                        selector = branch.selector
                        branchPrefix = branch.prefix
                    }

                    if (!selector) {
                        return stringifyJson(getValueByPath(inputJson, branchPrefix));
                    }

                    if (selector[0] === '#') {
                        expansionGrid = expandKeyValues(
                            inputJson,
                            expansionGrid,
                            branchPrefix,
                            columnIndex + columnOffset,
                            rowIndex + rowOffset,
                        );
                        maxHeight = Math.max(maxHeight, expansionGrid.length - rowIndex - 1);
                        columnOffset++
                        return
                    } else if (selector[0] === '*') {
                        expansionGrid = expandColumn(
                            inputJson,
                            expansionGrid,
                            branchPrefix,
                            selector,
                            columnIndex + columnOffset,
                            rowIndex + rowOffset
                        );
                        maxHeight = Math.max(maxHeight, expansionGrid.length - rowIndex - 1);
                        return
                    }

                    return stringifyJson(getValueByPath(inputJson, (branchPrefix ? branchPrefix + '.' : '') + selector))
                }
            );

            rowOffset = maxHeight;
            columnOffset = 0;

            return row;
        })

        return mergeGrids(selectorGrid, expansionGrid);
    }

    function getSelectorGrid(jsonGridSyntax) {
        return jsonGridSyntax.split(';').map(row => {
            return row.split(',').map(column => column.trim());
        });
    }

    function stringifyJson(inputJson) {
        return typeof inputJson == "string" ? inputJson : JSON.stringify(inputJson, replacer, space);
    }

    function getValueByPath(inputJson, path) {
        if (!path) {
            return inputJson;
        }

        const keys = path.split('.');

        let current = inputJson;

        for (let key of keys) {
            if (current === undefined || current === null) {
                return null;
            }
            current = current[key];
        }

        return current;
    }

    function mergeGrids(grid1, grid2) {
        if (grid2.length === 1 && grid2[0].length === 0) {
            return grid1;
        }

        let mergedGrid = [];
        let maxRows = Math.max(grid1.length, grid2.length);

        for (let i = 0; i < maxRows; i++) {
            let row1 = grid1[i] || [];
            let row2 = grid2[i] || [];
            let mergedRow = [];

            let maxCols = Math.max(row1.length, row2.length);

            for (let j = 0; j < maxCols; j++) {
                mergedRow[j] = row2[j] !== undefined ? row2[j] : row1[j];
            }

            mergedGrid.push(mergedRow);
        }

        return mergedGrid;
    }

    function expandKeyValues(
        inputJson,
        expansionGrid = [[]],
        branchPrefix = '',
        columnIndex = 0,
        rowIndex = 0
    ) {
        let index = rowIndex;

        const keyValues = getValueByPath(inputJson, branchPrefix);

        for (let key in keyValues) {
            if (typeof expansionGrid[index] == "undefined") {
                expansionGrid[index] = []
            }
            expansionGrid[index][columnIndex] = key;
            expansionGrid[index][columnIndex + 1] = stringifyJson(keyValues[key]);
            index++
        }

        return expansionGrid;
    }

    function expandColumn(
        inputJson,
        expansionGrid,
        branchPrefix,
        selector,
        columnIndex,
        rowIndex = 0
    ) {
        const prefix = branchPrefix ? branchPrefix + '.' : '';
        const grid = getValueByPath(inputJson, branchPrefix);

        for (let index in grid) {
            const computedSelector = prefix + selector.replace(/\*/g, index);
            if (typeof expansionGrid[index] == "undefined") {
                expansionGrid[index] = []
            }
            expansionGrid[index][columnIndex] = getValueByPath(inputJson,  computedSelector);
        }

        return expansionGrid;
    }

    function getSelectorBranch(selector) {
        if (!selector) {
            return;
        }

        const selectorParts = selector.split('>')

        if (typeof selectorParts[1] != "undefined") {
            return {
                prefix: selectorParts[0].trim(),
                selector: selectorParts[1].trim()
            }
        }
    }

    return parseJson(inputJson, jsonGridSyntax);
}

module.exports = jsonGridSyntax;
