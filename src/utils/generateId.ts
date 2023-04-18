enum ECounter {
    FOUNDATION = 'foundation',
    PILE = 'pile',
    CARD = 'card',
}

/**
 * Length of id.
 */
const ID_LENGTH = 10;

/**
 * Generate random ID.
 */
function getRandomCharCode() {
    let offset;
    let length;

    switch (Math.round((Math.random() * 100) % 3)) {
        case 1: // numbers
            offset = 48;
            length = 10;
            break;
        case 2: // lower case letter
            offset = 97;
            length = 25;
            break;
        default:
            offset = 65;
            length = 25;
    }

    return ((Math.random() * 10000) % length) + offset;
}

/**
 * Generate unique id for game board part.
 *
 * @param {ECounter} boardPart Board part.
 * @return {string} Unique id.
 */
function generateId(boardPart: ECounter): string {
    let id = `${boardPart}-id-`;

    for (let i = 0; i < ID_LENGTH; i++) {
        id += String.fromCharCode(getRandomCharCode());
    }

    return id;
}

/**
 * Generate unique id for foundation.
 *
 * @return {string} Unique id.
 */
export function generateFoundationId() {
    return generateId(ECounter.FOUNDATION);
}

export function generatePileId() {
    return generateId(ECounter.PILE);
}