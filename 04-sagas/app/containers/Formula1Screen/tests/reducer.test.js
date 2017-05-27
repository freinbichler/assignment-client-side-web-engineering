
import { fromJS } from 'immutable';
import formula1ScreenReducer from '../reducer';

describe('formula1ScreenReducer', () => {
  it('returns the initial state', () => {
    expect(formula1ScreenReducer(undefined, {})).toEqual(fromJS({}));
  });
});
