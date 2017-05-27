import { take, takeLatest, call, put, select, throttle } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_CONSTRUCTORS,
  LOAD_CONSTRUCTORS_SUCCESS,
  LOAD_CONSTRUCTORS_ERROR,
} from './constants';
import {
  loadConstructors,
  loadConstructorsSuccess,
  loadConstructorsError,
} from './actions';
import {
  selectConstructorsCount,
} from './selectors';

// Individual exports for testing
export function* getConstructors(action) {
  // See example in containers/HomePage/sagas.js
  const API_URL = `http://ergast.com/api/f1/constructors.json?limit=50&offset=${action.offset}`;
  try {
    const response = yield call(request, API_URL);
    const constructors = response.MRData.ConstructorTable.Constructors;

    yield put(loadConstructorsSuccess(constructors));

    const numConstructorsInState = yield select(selectConstructorsCount);
    if(response.MRData.total > numConstructorsInState) {
      yield put(loadConstructors(numConstructorsInState));
    }
  } catch (error) {
    yield put(loadConstructorsError(error));
  }
}

export function* watchConstructorsAction() {
  const watcher = yield throttle(100, LOAD_CONSTRUCTORS, getConstructors);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  watchConstructorsAction,
];
