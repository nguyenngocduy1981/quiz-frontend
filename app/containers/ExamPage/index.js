import React from 'react';
import PropTypes from 'prop-types';
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
import {answer, goHome, lamLaiBai, loadExam, nopBai} from './actions';
import saga from './saga';

import './style.scss';
import QuestionsList from '../../components/Questions/QuestionsList';
import {Helmet} from 'react-helmet';
import Error from "components/Error";
import {OPTION_FROM_GIVEN} from "../../constants/constants";

const _ = require('lodash');

class ExamPage extends React.Component {
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
    const {name} = this.props.match.params;
    this.setState({currentExam: name}, () => {
      this.props.loadExam(name);
    });
  }

  hasAnswerChange = (evt) => {
    const {val, quesId} = this.state;
    return val !== evt.val || quesId !== evt.quesId;
  };

  onAnswerChange = (payload, section) => {
    payload.section = section;
    if (!this.hasAnswerChange(payload)) {
      return;
    }
    this.setState(payload, () => {
      this.props.answer(payload);
    });
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

    return _.keys(exam)
      .map((k) => this.renderQuestions(k, exam[k]));
  }

  renderAnsweredQuestion = () => {
    let total = 0;
    let answered = 0;
    const {exam} = this.props;
    _.keys(exam)
      .forEach(k => {
        const questions = exam[k];
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

    const {type, options} = sec;
    if (type !== OPTION_FROM_GIVEN) return '';

    return (<div className={'options'}>{options.map(this.renderOption)}</div>);
  }

  renderQuestions = (k, questions) => {
    const first = questions[0];
    const secId = first.sectionId;
    return (
      <section key={`sec_${k}`} className={'section'}>
        <section className={'section-header'}>
          <h3>{first.sectionName}</h3>
          <h3 onClick={this.collapseToggle(first.sectionId)}>
            {this.renderAnsweredQuestionInSection(questions)}
            &nbsp;&nbsp;
            {this.renderExpandCollap(secId)}
          </h3>
        </section>
        {
          this.checkCollapse(secId) || (
            <div className={'section_options'}>
              {this.renderSectionOptions(first)}
              <QuestionsList
                questions={questions}
                onAnswerChange={(e) => this.onAnswerChange(e, k)}
              />
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
        <div>
          <span className={'btn'} onClick={e => this.props.nopBai(this.state.currentExam)}>Nộp bài</span>
          <span className={'btn'} onClick={this.props.lamLaiBai}>Làm lại</span>
        </div>
        <div>{this.renderAnsweredQuestion()}</div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>ExamPage</title>
          <meta name="description" content="yyyyy"/>
        </Helmet>
        <div className="exam-page">
          {this.renderSummary()}
          {this.renderSections()}
        </div>
      </article>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  loadExam: (payload) => dispatch(loadExam(payload)),
  answer: (payload) => dispatch(answer(payload)),
  nopBai: (payload) => dispatch(nopBai(payload)),
  lamLaiBai: () => dispatch(lamLaiBai()),
  goHome: () => dispatch(goHome()),
});

const mapStateToProps = createStructuredSelector({
  exam: makeSelectExam(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'exam-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(ExamPage);
