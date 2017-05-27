import { take, takeLatest, call, put, select, throttle } from 'redux-saga/effects';
import request from 'utils/request';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  LOAD_CONSTRUCTORS,
  LOAD_CONSTRUCTORS_SUCCESS,
  LOAD_CONSTRUCTORS_ERROR,
  LOAD_DRIVERS,
  LOAD_DRIVERS_SUCCESS,
  LOAD_DRIVERS_ERROR,
} from './constants';
import {
  loadConstructors,
  loadConstructorsSuccess,
  loadConstructorsError,
  loadDrivers,
  loadDriversSuccess,
  loadDriversError,
} from './actions';
import {
  selectConstructorsCount,
} from './selectors';

export function* getConstructors(action) {
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

export function* getDrivers(action) {
  const API_URL = `http://ergast.com/api/f1/constructors/${action.constructorId}/drivers.json?limit=10000`;
  try {
    const response = yield call(request, API_URL);
    const drivers = response.MRData.DriverTable.Drivers;
    yield put(loadDriversSuccess(drivers));
  } catch (error) {
    yield put(loadDriversError(error));
  }
}

export function* watchDriversAction() {
  const watcher = yield throttle(100, LOAD_DRIVERS, getDrivers);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  watchConstructorsAction,
  watchDriversAction,
];
