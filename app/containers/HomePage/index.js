import React from 'react';
import './style.scss';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import {makeSelectError, makeSelectExamList, makeSelectLoading} from './selectors';
import {loadExamList, takeExam} from './actions';
import saga from './saga';
import LoadingIndicator from '../../components/LoadingIndicator';

import Error from "components/Error";
import {getCurrentExamName} from "../../utils/local-storage";
import {Link} from "react-router-dom";
// import Header from 'components/Header';
// import Footer from 'components/Footer';

class HomePage extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadExamList();
  }

  renderSelectedExam = (examName) => {
    return getCurrentExamName() === examName ? 'current_exam' : '';
  }

  renderExamItem = (examName, idx) => {
    return (
      <section key={`exm_${idx}`}
               className={this.renderSelectedExam(examName)}
               onClick={e => this.props.takeExam(examName)}>
        {examName}
      </section>
    );
  }

  renderPage = () => {
    const {
      loading, error, examList,
    } = this.props;

    if (loading) {
      return <LoadingIndicator/>;
    }
    if (error) {
      return <Error err={error}/>;
    }
    if (!examList) {
      return (
        <section><h3>Khong co Exam nao</h3></section>
      );
    }
    return examList.map(this.renderExamItem);
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home page</title>
          <meta name="description" content="pp"/>
        </Helmet>
        <div className="home-page">

          <section>
            <Link className="router-link" to="/exam-rs">
              Ket qua
            </Link>
          </section>
          {this.renderPage()}
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadExamList: () => dispatch(loadExamList()),
  takeExam: (payload) => dispatch(takeExam(payload)),
});

const mapStateToProps = createStructuredSelector({
  examList: makeSelectExamList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({
  key: 'home-page',
  saga,
});

export default compose(
  withSaga,
  withConnect,
)(HomePage);
