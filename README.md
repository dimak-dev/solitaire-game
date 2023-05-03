# Solitaire Game - React and TypeScript

This is a pet project that demonstrates my experience in step-by-step frontend development using the whole most popular frontend stack: React, Redux, Typescript and Jest.
The development goes with coverages by tests.
It's a solitaire game, where the player aims to move all the cards to the foundation piles in the correct order.

If you have any questions or propositions, you can contact me by email: [github@dimak.dev](mailto:github@dimak.dev?subject=GitHub%20solitaire-game).

Currently, this project is under development in my free time.

## Features

- Generating pack of cards.
- Building tableau.
- Detecting current position of selected card and possible targets.
- Manually moving card from talon and tableau to the foundation piles.

## ToDo Features

- Drag and drop functionality for moving cards between tableau and to the foundation piles.
- Double click to automatically move cards to the foundation piles.
- Undo and redo functionality.
- Game timer to track the player's progress.
- Hint button to suggest possible moves.

## Known issues:

- Target hints do not reset after moving the card.
- There is no visible hint of the previously laid card on the foundation.
- The player can't pick a card from the foundation if previously moving was to the foundation.
- Big bug: There is no card with the value "10", but exists with the value "1".
- Need to refactor duplicates in the reducer code.

## About tests

My point of view on tests is, as far as possible, to write tests (or test cases) before development (TDD).
The tests must cover only functionality realised in this function or component. 
For that, you must use mocks for a [whole module](src/redux/reducers/showPossibleTargetsReducer.test.ts) or just only one method (even [built-in](src/utils/shuffle.test.ts))

For example, in this project, I developed some [additional matchers](src/tests/jest/matchers) for jest and covered them with tests.

## Installation and Usage

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/solitaire.git
   ```

2. Navigate to the project directory:

   ```bash
   cd solitaire-game
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run tests:

   ```bash
   npm test
   ```

5. Start the application:

   ```bash
   npm start
   ```

   The application will be available at [http://localhost:9000](http://localhost:9000).

## Technologies Used

- React
- Redux
- TypeScript
- SCSS
- Material UI

## Project Structure

- `public/`: Contains the index.html file and other static assets.
- `src/`: Contains the source code for the application.
- `src/components/`: Contains the React components used to build ui for the application.
- `src/utils/`: Contains utility functions and constants used in the application.
- `src/redux/`: Contains state managers used in the application.
- `src/tests/`: Contains configurations and helpers for jest.

## Acknowledgments

This project was inspired by the classic solitaire game and was created as a demonstration of my frontend development skills. Special thanks to the following resources for providing guidance and inspiration:

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Redux documentation](https://redux.js.org/introduction/getting-started)
- [Solitaire game rules](https://www.bicyclecards.com/how-to-play/solitaire/)
- [Material UI documentation](https://mui.com/material-ui/getting-started/overview/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
