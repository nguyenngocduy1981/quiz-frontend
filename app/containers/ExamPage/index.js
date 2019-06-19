import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectQuestions,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { answer, loadQuestions } from './actions';
import saga from './saga';
import ExamPage from './ExamPage';

const mapDispatchToProps = (dispatch) => ({
  loadQuestions: () => dispatch(loadQuestions()),
  answer: (payload) => dispatch(answer(payload)),
});

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'exam',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(ExamPage);
