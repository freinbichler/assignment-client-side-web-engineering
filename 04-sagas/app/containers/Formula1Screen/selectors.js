import { createSelector } from 'reselect';

/**
 * Direct selector to the formula1Screen state domain
 */
const selectFormula1ScreenDomain = (state) => state.get('formula1Screen');

/**
 * Other specific selectors
 */

const selectConstructors = () => createSelector(
  selectFormula1ScreenDomain,
  (state) => state.get('constructors')
);

const selectConstructorsCount = createSelector(
  selectConstructors(),
  (constructors) => (constructors ? constructors.length : 0),
);

const selectDrivers = () => createSelector(
  selectFormula1ScreenDomain,
  (state) => state.get('drivers')
);

export {
  selectConstructors,
  selectConstructorsCount,
  selectDrivers,
};
