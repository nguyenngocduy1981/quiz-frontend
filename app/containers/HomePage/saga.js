import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import {LOAD_EXAM_LIST, examListLoaded, examListLoadingError, TAKE_EXAM} from './actions';

import {push} from 'react-router-redux';

import request from 'utils/request';
import {GET_EXAM_LIST} from '../../constants/service-model';

const _ = require('lodash');

export function* takeExam(payload) {
  const {examName} = payload;
  yield put(push(`/exam/${examName}`));
}

export function* fetchExamList() {
  try {
    const res = yield call(request, GET_EXAM_LIST);
    if(res.result.code){
      yield put(examListLoadingError(res.result.msg));
    } else {
      yield put(examListLoaded(res.result));
    }
  } catch (err) {
    yield put(examListLoadingError(err));
  }
}

export default function* questionsData() {
  yield takeLatest(LOAD_EXAM_LIST, fetchExamList);
  yield takeLatest(TAKE_EXAM, takeExam);
}
