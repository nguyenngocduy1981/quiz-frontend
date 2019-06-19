import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = (state) => state.exam || initialState;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.error
);

const makeSelectQuestions = () => createSelector(
  selectGlobal,
  (globalState) => globalState.questions
);


export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectQuestions,
};
