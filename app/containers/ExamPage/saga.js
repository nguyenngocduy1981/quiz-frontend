import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {LOAD_EXAM, examLoaded, repoLoadingError, GO_HOME, LAM_LAI_BAI, NOP_BAI} from './actions';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {getCurrentExamName, getExam, resetExam, saveCurrentExamName, saveExam} from '../../utils/local-storage';
import {GET_EXAM, POST_EXAM} from '../../constants/service-model';

const _ = require('lodash');

export function* goHome() {
  yield put(push('/'));
}

export function* nopBai(payload) {
  const {examName} = payload;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(getExam())
  };

  try {
    const URI = POST_EXAM.replace('{exam}', examName);
    const res = yield call(request, URI, options);
    if (res.result.code) {
      yield put(repoLoadingError(res.result.msg));
    } else {
      resetExam();
      yield put(push('/'));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

export function* lamLaiBaiThi() {
  const exam = getExam();

  const keys = _.keys(exam);
  for (let k of keys) {
    exam[k] = exam[k].map(q => {
      q.answered = '';
      const {passages} = q;
      if (passages) {
        q.passages = passages.map(p => {
          p.answered = '';
          return p;
        });
      }
      return q;
    });
  }

  yield put(examLoaded(exam));
  saveExam(exam);
}

export function* fetchExam(payload) {
  const {examName} = payload;
  try {
    let exam = examName === getCurrentExamName() ? getExam() : null;
    if (exam) {
      yield put(examLoaded(exam));
    } else {
      const URI = GET_EXAM.replace('{exam}', examName);
      const res = yield call(request, URI);
      if (res.result.code) {
        yield put(repoLoadingError(res.result.msg));
      } else {
        exam = res.result;
        yield put(examLoaded(exam));
        saveCurrentExamName(examName);
        saveExam(exam);
      }
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
  yield takeLatest(LOAD_EXAM, fetchExam);
  yield takeLatest(GO_HOME, goHome);
  yield takeLatest(LAM_LAI_BAI, lamLaiBaiThi);
  yield takeLatest(NOP_BAI, nopBai);
}
