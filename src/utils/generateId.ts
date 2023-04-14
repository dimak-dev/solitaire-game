enum ECounter {
    FOUNDATION = 'foundation',
    PILE = 'pile',
    CARD = 'card',
}

/**
 * Counters.
 */
const counters: Record<ECounter, number> = {
    [ECounter.FOUNDATION]: 0,
    [ECounter.PILE]: 0,
    [ECounter.CARD]: 0,
}

/**
 * Generate unique id for game board part.
 *
 * @param {ECounter} boardPart Board part.
 * @return {string} Unique id.
 */
function generateId(boardPart: ECounter): string {
    return `${boardPart}-id-${counters[boardPart]++}`;
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