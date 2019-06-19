export const LOAD_REPOS = '[ExamPage] Load questions';
export const LOAD_REPOS_SUCCESS = '[ExamPage] Load questions SUCCESS';
export const LOAD_REPOS_ERROR = '[ExamPage] Load questions ERROR';

export const ANSWER = 'ANSWER';


export function answer(payload) {
  return {
    type: ANSWER,
    payload,
  };
}

export function loadQuestions() {
  return {
    type: LOAD_REPOS,
  };
}

export function questionsLoaded(questions) {
  return {
    type: LOAD_REPOS_SUCCESS,
    questions,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
