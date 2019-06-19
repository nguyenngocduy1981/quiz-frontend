import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, SELECT_QUESTION } from './actions';

export const initialState = {
  loading: false,
  error: false,
  questions: false,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        questions: false,
      };

      return newState;
    }
    case LOAD_REPOS_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        questions: action.questions,
      };
      return newState;
    }

    case SELECT_QUESTION: {
      console.log('action: ', action);
      let { questions } = state;
      const { payload } = action;
      questions = questions.map(q => {
          if (q.id === payload.id) {
            q.selected = !q.selected;
          }
          return q;
        },
      );
      const newState = {
        ...state,
        loading: false,
        questions,
      };
      return newState;
    }

    case LOAD_REPOS_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}

export default appReducer;
