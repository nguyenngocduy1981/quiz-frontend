import {
  put, takeLatest,
} from 'redux-saga/effects';
import {LOAD_EXAM_RESULT, examLoaded, repoLoadingError, GO_HOME} from './actions';

import {push} from 'react-router-redux';

import {
  getExamResult,
} from '../../utils/local-storage';

const _ = require('lodash');

export function* goHome() {
  yield put(push('/'));
}

export function* fetchExam() {
  try {
    const exam = getExamResult();
    if (exam) {
      yield put(examLoaded(exam));
    } else {
      notify("No exam result");
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* questionsData() {
  // Watches for LOAD_EXAM actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_EXAM_RESULT, fetchExam);
  yield takeLatest(GO_HOME, goHome);
}
