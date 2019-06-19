import React from 'react';
import './style.scss';
import ViewOnlyListItem from '../ListItem/ViewOnlyListItem';
import AnswerListItem from '../ListItem/AnswerListItem';

class List extends React.Component {

  onItemClick = quesId => evt => {
    const { posAnsId } = evt;
    this.props.onAnswerClick({
      posAnsId,
      quesId,
    });
  };

  renderAnswerList = () => {
    const { items, viewOnly, onSelectQuestion } = this.props;

    return items.map((item, idx) => {
      if (viewOnly) {
        return (
          <ViewOnlyListItem key={`item-${item.id}`} item={item}
                            idx={idx + 1} onSelectQuestion={onSelectQuestion}/>
        );
      }
      return (
        <AnswerListItem key={`item-${item.id}`} item={item}
                        idx={idx + 1}
                        onClick={this.onItemClick(item.id)}/>
      );
    });
  };

  render() {
    const { items } = this.props;
    if (!items) return null;

    return (
      <div className="list-wrapper">
        {this.renderAnswerList()}
      </div>
    );
  }
}

export default List;
