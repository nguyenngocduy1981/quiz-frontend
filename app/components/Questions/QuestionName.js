import React from 'react';
import './style.scss';

class QuestionsName extends React.PureComponent {
  render() {
    const { text, idx } = this.props;
    return (
      <h3 className={'question-name-view-only'}>Question {idx} - {text}</h3>
    );
  }
}

export default QuestionsName;
