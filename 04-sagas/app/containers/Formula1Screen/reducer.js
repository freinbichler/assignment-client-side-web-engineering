/*
 *
 * Formula1Screen reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_CONSTRUCTORS_SUCCESS,
  LOAD_DRIVERS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function formula1ScreenReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONSTRUCTORS_SUCCESS:
      const constructorsInState = state.get('constructors');
      const constructors = constructorsInState ? constructorsInState.concat(action.constructors) : action.constructors;
      return state.set('constructors', constructors);
    case LOAD_DRIVERS_SUCCESS:
    console.log(action.drivers);
      return state.set('drivers', action.drivers);
    default:
      return state;
  }
}

export default formula1ScreenReducer;
