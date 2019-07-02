export const LOAD_EXAM_LIST = '[HomePage] Load exam list';
export const LOAD_EXAM_LIST_SUCCESS = '[HomePage] Load exam list SUCCESS';
export const LOAD_EXAM_LIST_FAIL = '[HomePage] Load exam list fail';

export const TAKE_EXAM = '[HomePage] take exam';


export function takeExam(examName) {
  return {
    type: TAKE_EXAM,
    examName
  };
}
export function loadExamList() {
  return {
    type: LOAD_EXAM_LIST,
  };
}

export function examListLoaded(payload) {
  return {
    type: LOAD_EXAM_LIST_SUCCESS,
    payload,
  };
}

export function examListLoadingError(error) {
  return {
    type: LOAD_EXAM_LIST_FAIL,
    error,
  };
}
