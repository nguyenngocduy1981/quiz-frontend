export const LOAD_REPOS = '[AdminPage] Load questions';
export const LOAD_REPOS_SUCCESS = '[AdminPage] Load questions SUCCESS';
export const LOAD_REPOS_ERROR = '[AdminPage] Load questions ERROR';
export const SELECT_QUESTION = '[AdminPage] Select question';


export function selectQuestion(payload) {
  return {
    type: SELECT_QUESTION,
    payload
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
