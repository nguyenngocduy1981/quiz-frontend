import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectQuestions,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { loadQuestions, selectQuestion } from './actions';
import saga from './saga';
import PropTypes from 'prop-types';
import QuestionsList from '../../components/Questions/QuestionsList';
import LoadingIndicator from '../../components/LoadingIndicator';
import SummaryInfo from '../../components/SummaryInfo';
import './style.scss';

class AdminPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posAnsId: 0,
      quesId: 0,
    };
  }

  componentDidMount() {
    console.log('AdminPage loadQuestions');
    this.props.loadQuestions();
  }

  onSelectQuestion = (evt) => {
    this.props.selectQuestion(evt);
  };

  renderQuestions = () => {
    const {
      loading, error, questions,
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <h1>something wrong</h1>;
    }
    // onItemClick, onSelectQuestion
    return (
      <section>
        <QuestionsList questions={questions} viewOnly={true}
                       onSelectQuestion={this.onSelectQuestion}
        />
      </section>
    );
  };

  extractSelectedQuestion = () => {
    const { questions } = this.props;
    const msg = ' questions';
    if (!questions) return 0 + msg;

    return questions.filter(q => q.selected).length + msg;
  };

  render() {
    return (
      <article>
        {/*<Helmet>*/}
        {/*<title>Xxxx</title>*/}
        {/*<meta name="zz" content="yyyyy" />*/}
        {/*</Helmet>*/}
        <div className="admin-page">
          <SummaryInfo lValue={'Xyz@ok.com'} rValue={this.extractSelectedQuestion()}/>
          {/*<section className="centered">*/}
          {/*<h2>aaa</h2>*/}
          {/*<p>bbbbb</p>*/}
          {/*</section>*/}
          {
            this.renderQuestions()
          }
          {
            this.renderQuestions()
          }
          {
            this.renderQuestions()
          }
          {
            this.renderQuestions()
          }
          {
            this.renderQuestions()
          }
          {
            this.renderQuestions()
          }
        </div>
      </article>
    );
  }
}

AdminPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  questions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadQuestions: PropTypes.func,
  selectQuestion: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  loadQuestions: () => dispatch(loadQuestions()),
  selectQuestion: (payload) => dispatch(selectQuestion(payload)),
});

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'admin',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(AdminPage);
