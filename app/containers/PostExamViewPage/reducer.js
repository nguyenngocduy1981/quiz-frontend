import {LOAD_EXAM_SUCCESS, LOAD_EXAM_RESULT, LOAD_REPOS_ERROR} from './actions';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exam: false,
};

function examResultReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM_RESULT: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        exam: false,
      };

      return newState;
    }
    case LOAD_EXAM_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        exam: action.exam,
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

export default examResultReducer;
