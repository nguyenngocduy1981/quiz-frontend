import React from 'react';
import './style.scss';
import List from 'components/List';

class QuestionsList extends React.PureComponent {

  render() {
    const {questions, onAnswerChange} = this.props;
    return (
      <List items={questions} onAnswerChange={onAnswerChange}/>
    );
  }
}

export default QuestionsList;
