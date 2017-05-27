/*
 *
 * Formula1Screen actions
 *
 */

import {
  LOAD_CONSTRUCTORS,
  LOAD_CONSTRUCTORS_SUCCESS,
  LOAD_CONSTRUCTORS_ERROR,
} from './constants';

export function loadConstructors(offset = 0) {
  return {
    type: LOAD_CONSTRUCTORS,
    offset,
  };
}

export function loadConstructorsSuccess(constructors) {
  return {
    type: LOAD_CONSTRUCTORS_SUCCESS,
    constructors,
  };
}

export function loadConstructorsError(error) {
  return {
    type: LOAD_CONSTRUCTORS_ERROR,
    error,
  };
}
