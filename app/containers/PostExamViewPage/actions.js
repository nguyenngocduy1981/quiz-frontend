export const LOAD_EXAM_RESULT = '[PostExamViewPage] LOAD_EXAM_RESULT exam';
export const LOAD_EXAM_SUCCESS = '[PostExamViewPage] LOAD_EXAM_SUCCESS exam';
export const LOAD_REPOS_ERROR = '[PostExamViewPage] Load exam ERROR';

export const GO_HOME = '[PostExamViewPage] go home';

export function goHome() {
  return {
    type: GO_HOME
  };
}

export function loadExamResult() {
  return {
    type: LOAD_EXAM_RESULT,
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
