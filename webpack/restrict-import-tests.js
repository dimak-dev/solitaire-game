const path = require('path');

function handler(source) {
    const restrictedPath = path.resolve(__dirname, '..', 'src', 'tests');

    if(this.resourcePath.startsWith(restrictedPath)) {
        throw new Error(`Import from ./src/tests is restricted`);
    }

    return source;
}

module.exports = handler;