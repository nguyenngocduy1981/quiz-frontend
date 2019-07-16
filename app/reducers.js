/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import examReducer from 'containers/ExamPage/reducer';
import examResultReducer from 'containers/PostExamViewPage/reducer';
import homeReducer from 'containers/HomePage/reducer';
// import adminReducer from 'containers/AdminPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    exam: examReducer,
    examResult: examResultReducer,
    examList: homeReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
