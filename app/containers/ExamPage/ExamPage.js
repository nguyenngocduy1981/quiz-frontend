import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import './style.scss';
import QuestionsList from '../../components/Questions/QuestionsList';
import SummaryInfo from '../../components/SummaryInfo';

export default class ExamPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posAnsId: 0,
      quesId: 0,
    };
  }

  componentDidMount() {
    this.props.loadQuestions();
  }

  hasChange = (evt) => {
    const { posAnsId, quesId } = this.state;
    return posAnsId !== evt.posAnsId || quesId !== evt.quesId;
  };

  onAnswerClick = (evt) => {
    if (!this.hasChange(evt)) {
      return;
    }
    this.setState(evt, () => {
      this.props.answer(evt);
    });
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
    if (!questions) {
      return (
        <section><h3>No questions</h3></section>
      );
    }
    return (
      <section>
        <QuestionsList viewOnly={false} questions={questions} onAnswerClick={this.onAnswerClick}/>
      </section>
    );
  };

  checkAnswer = (q) => {
    const { posibleAnswers } = q;
    return posibleAnswers.filter(p => p.selected).length > 0;
  };
  extractAnswerQuestion = () => {
    const { questions } = this.props;

    if (!questions) return 0;

    const msg = `/${questions.length}`;
    return questions.filter(this.checkAnswer).length + msg;
  };

  render() {
    return (
      <article>
        {/*<Helmet>*/}
        {/*<title>Xxxx</title>*/}
        {/*<meta name="zz" content="yyyyy" />*/}
        {/*</Helmet>*/}
        <div className="exam-page">
          <SummaryInfo lValue={'xx'} rValue={this.extractAnswerQuestion()}/>
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
        </div>
      </article>
    );
  }
}

ExamPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  questions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadQuestions: PropTypes.func,
  answer: PropTypes.func,
};
