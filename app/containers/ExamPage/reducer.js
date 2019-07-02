import {LOAD_EXAM_SUCCESS, LOAD_EXAM, LOAD_REPOS_ERROR, ANSWER} from './actions';
import {saveExam} from '../../utils/local-storage';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  exam: false,
};

function examReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXAM: {
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
    case ANSWER: {
      const {val, quesId, section} = action.payload;

      const exam = Object.assign({}, state.exam)

      exam[section] = exam[section]
        .map(q => {
          if (q.id === quesId) {
            q.answered = val;
            // if (input.type === ANSWER_TYPE.SELECT) {
            //   q.possibleAnswers.forEach(p => p.selected = p.id === input.val);
            // } else if (input.type === ANSWER_TYPE.INPUT) {
            //   q.answered = {text: input.val};
            // }
          }
          return q;
        });
      saveExam(exam);
      return {
        ...state,
        error: action.error,
        loading: false,
        exam,
      };
    }

    default:
      return state;
  }
}

export default examReducer;
