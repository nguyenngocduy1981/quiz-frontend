export const LOAD_EXAM = '[ExamPage] Load exam';
export const LOAD_EXAM_SUCCESS = '[ExamPage] Load exam SUCCESS';
export const LOAD_REPOS_ERROR = '[ExamPage] Load exam ERROR';

export const ANSWER = '[ExamPage] ANSWER';
export const GO_HOME = '[ExamPage] go home';
export const LAM_LAI_BAI = '[ExamPage] lam lai bai';
export const NOP_BAI = '[ExamPage] nop bai';


export function goHome() {
  return {
    type: GO_HOME
  };
}

export function nopBai(examName) {
  return {
    type: NOP_BAI,
    examName
  };
}
export function lamLaiBai() {
  return {
    type: LAM_LAI_BAI
  };
}

export function answer(payload) {
  return {
    type: ANSWER,
    payload,
  };
}

export function loadExam(examName) {
  return {
    type: LOAD_EXAM,
    examName
  };
}

export function examLoaded(exam) {
  return {
    type: LOAD_EXAM_SUCCESS,
    exam,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
