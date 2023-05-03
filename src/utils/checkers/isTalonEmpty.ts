import {IGameBoard} from "Types/IGameBoard";

/**
 * Check that talon is empty.
 *
 * @param talon
 */
export default function (talon: IGameBoard['talon']): boolean {
    return !talon?.length;
}