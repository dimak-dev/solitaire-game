declare module '*.svg' {
    const content: string;
    export default content;
}

declare namespace jest {
    interface Matchers<R> {
        /**
         * Check that a variable is type of string or instanceof String.
         */
        toBeString(): R;

        /**
         * Check that all elements of array is unique.
         */
        toBeUniqueArray(): R;
    }
}
