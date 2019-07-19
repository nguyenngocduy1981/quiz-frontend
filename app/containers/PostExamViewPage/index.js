import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import injectSaga from 'utils/injectSaga';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectExam,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import {goHome, loadExamResult} from './actions';
import saga from './saga';

import './style.scss';
import {Helmet} from 'react-helmet';
import Error from "components/Error";
import {
  OPTION_FROM_GIVEN,
  PASSAGE,
  PASSAGE_OPTION_FROM_GIVEN,
  PASSAGE_TYPES,
  QUESTION_OPTION_TYPES
} from "../../constants/constants";

const _ = require('lodash');

class PostExamViewPage extends React.Component {
  // collapse: {"sec_"+value: true/false}
  constructor(props) {
    super(props);
    this.state = {
      posAnsId: 0,
      textAns: '',
      quesId: 0,
      currentExam: '',
      collapse: {}
    };
  }

  componentDidMount() {
    this.props.loadExamResult();
  }

  renderSections = () => {
    const {
      loading, error, exam,
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error err={error}/>
    }
    if (!exam) {
      return (
        <section><h3>Khong co cau hoi nao</h3></section>
      );
    }

    return exam.map(this.renderQuestions);
  }

  renderAnsweredQuestion = () => {
    let total = 0;
    let answered = 0;
    const {exam} = this.props;
    if (!exam) return `${answered} / ${total}`;

    exam.forEach(item => {
      const {questions} = item;
      total += questions.length;
      answered += questions.filter(q => q.answered && q.answered.length).length;
    });

    return `${answered} / ${total}`;
  }

  renderAnsweredQuestionInSection = (questions) => {
    const total = questions.length;
    const answered = questions.filter(q => q.answered && q.answered.length).length;
    return `${answered} / ${total}`;
  }

  collapseToggle = (secId) => (evt) => {
    const collapse = this.state;
    collapse[`sec_${secId}`] = !collapse[`sec_${secId}`];
    this.setState({collapse});
  }

  renderExpandCollap = (secId) => (this.checkCollapse(secId) ? '➕' : '➖');

  checkCollapse = (secId) => this.state.collapse[`sec_${secId}`];

  renderOption = (op, idx) => {
    return (<span key={idx}>{op}</span>)
  }

  renderSectionOptions = (sec) => {
    const {options} = sec;
    return (<div className={'options'}>{options.map(this.renderOption)}</div>);
  }

  renderTextAnswer(ques) {
    return <h5 className={ques.answered === ques.answer ? 'correct' : 'incorrect'} title={this.getAns(ques)}>
      {ques.answered}
    </h5>
  }

  getAns = (ques) => {
    if (!ques.answer) return 'Không tim thấy';

    return `Đáp án đúng: ${ques.answer}`;
  }

  renderPossibleAnswer(ques) {
    if (!ques.possibleAnswers) return null;

    const {possibleAnswers} = ques;
    return possibleAnswers.map((p, idx) =>
      <span key={`post_${idx}`}
            className={`pos_an ${ques.answered === ques.answer === p ? 'selected' : ''}`}
            dangerouslySetInnerHTML={{__html: p}}
      />,
    );
  }

  renderPASSAGE_OPTION_FROM_GIVENText = (ques) => {
    return (
      <span className={ques.answered === ques.answer ? 'correct' : 'incorrect'} title={this.getAns(ques)}>
        {ques.answered}
      </span>
    )
  }

  renderAnswer(section, ques) {
    const correct = ques.answered === ques.answer;
    const type = section.questionType;

    if (QUESTION_OPTION_TYPES.includes(type)) {
      return (
        <div className={'possible-ans'}>
          <span className={'pos-view'}>{this.renderPossibleAnswer(ques)}</span>
          <h5 className={correct ? 'correct' : 'incorrect'} title={this.getAns(ques)}>
            {ques.answered}
          </h5>
        </div>
      );
    }
    return this.renderTextAnswer(ques);
  }


  renderQuestion = (section, q, idx) => {
    const type = section.questionType;
    const isPassOpFromGiven = type === PASSAGE_OPTION_FROM_GIVEN;
    return (
      <div key={idx}>
        <div className="list-item-wrapper">
          {isPassOpFromGiven && <span className={'question-name-view-only'}>{q.text})&nbsp;</span>}
          {isPassOpFromGiven && this.renderPASSAGE_OPTION_FROM_GIVENText(q)}

          {!isPassOpFromGiven && <h3 className={'question-name-view-only'}>Question {idx + 1} - {q.text}</h3>}
          {!isPassOpFromGiven && this.renderAnswer(section, q)}
        </div>
      </div>

    )
  }

  renderPASSAGE_OPTION_FROM_GIVEN = (options) => {
    return (
      <div className={'op'}>
        {options.map((o, idx) => <span key={`op_${idx}`}>{o}</span>)}
      </div>
    );
  }
  renderPASSAGE_TYPES = (passage, type) => {
    return (
      <section>
        {type === PASSAGE_OPTION_FROM_GIVEN && this.renderPASSAGE_OPTION_FROM_GIVEN(passage.options)}

        <div dangerouslySetInnerHTML={{__html: passage.text}}/>
      </section>
    )
  }

  renderQuestions = (examItem) => {
    const {section, passage, questions} = examItem;
    const type = section.questionType;
    const secId = section.id;
    return (
      <section key={`sec_${secId}`} className={'section'}>
        <section className={'section-header'}>
          <h3>{section.text} - {type}</h3>
          <h3 onClick={this.collapseToggle(secId)}>
            {this.renderAnsweredQuestionInSection(questions)}
            &nbsp;&nbsp;
            {this.renderExpandCollap(secId)}
          </h3>
        </section>
        {OPTION_FROM_GIVEN === type && this.renderSectionOptions(section)}
        {PASSAGE_TYPES.includes(type) && this.renderPASSAGE_TYPES(passage, type)}
        {
          this.checkCollapse(secId) || (
            <div className={'section_options'}>
              {questions.map((q, idx) => this.renderQuestion(section, q, idx))}
            </div>
          )
        }
      </section>
    );
  };

  renderSummary = () => {
    return (
      <div className={'summary'}>
        <div>
          <span className={'btn'} onClick={this.props.goHome}>Về trang danh sách bài thi</span>
        </div>
        <div>{this.renderAnsweredQuestion()}</div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>PostExamViewPage</title>
          <meta name="description" content="yyyyy"/>
        </Helmet>
        <div className="exam-result-page">
          {this.renderSummary()}
          {this.renderSections()}
        </div>
      </article>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  loadExamResult: () => dispatch(loadExamResult()),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  exam: makeSelectExam(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'exam-result-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(PostExamViewPage);
