/*
 *
 * Formula1Screen reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CONSTRUCTORS_SUCCESS,
} from './constants';

const initialState = fromJS({
  // constructors: [],
});

function formula1ScreenReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONSTRUCTORS_SUCCESS:
      const constructorsInState = state.get('constructors');
      const constructors = constructorsInState ? constructorsInState.concat(action.constructors) : action.constructors;
      return state.set('constructors', constructors);
    default:
      return state;
  }
}

export default formula1ScreenReducer;
