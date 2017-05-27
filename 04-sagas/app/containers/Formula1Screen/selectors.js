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


/**
 * Default selector used by Formula1Screen
 */

// const makeSelectFormula1Screen = () => createSelector(
//   selectFormula1ScreenDomain(),
//   (substate) => substate.toJS()
// );

// export default makeSelectFormula1Screen;
export {
  // selectFormula1ScreenDomain,
  selectConstructors,
  selectConstructorsCount,
};
