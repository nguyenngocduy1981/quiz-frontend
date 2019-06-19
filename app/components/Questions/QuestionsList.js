import React from 'react';

import List from 'components/List';

class QuestionsList extends React.PureComponent {

  render() {
    const { questions, viewOnly, onAnswerClick, onSelectQuestion } = this.props;
    return (
      <List items={questions} viewOnly={viewOnly}
            onAnswerClick={onAnswerClick} onSelectQuestion={onSelectQuestion}
      />
    );
  }
}

export default QuestionsList;
