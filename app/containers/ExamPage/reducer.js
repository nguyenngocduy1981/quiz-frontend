import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR, ANSWER } from './actions';
import { saveQuestions } from '../../utils/local-storage';

// The initial state of the App
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


    case LOAD_REPOS_ERROR: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case ANSWER: {
      const { posAnsId, quesId } = action.payload;
      const questions = state.questions.map(q => {

        if (q.id === quesId && q.posibleAnswers) {
          q.posibleAnswers
            .map(p => {
              p.selected = p.id === posAnsId;
              return p;
            });
        }
        return q;
      });
      saveQuestions(questions);
      return {
        ...state,
        error: action.error,
        loading: false,
        questions,
      };
    }

    default:
      return state;
  }
}

export default appReducer;
