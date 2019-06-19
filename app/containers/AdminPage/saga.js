import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { LOAD_REPOS, questionsLoaded, repoLoadingError } from './actions';

import request from 'utils/request';
import { GET_QUESTIONS } from '../../constants/service-model';
import { getQuestions, saveQuestions } from '../../utils/local-storage';

export function* getRepos() {
  // try {
  //   const questions = yield call(request, GET_QUESTIONS);
  //   yield put(questionsLoaded(questions));
  // } catch (err) {
  //   yield put(repoLoadingError(err));
  // }
  try {
    let questions = getQuestions();
    if (questions) {
      yield put(questionsLoaded(questions));
    } else {
      questions = yield call(request, GET_QUESTIONS);
      yield put(questionsLoaded(questions));
      saveQuestions(questions);
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
