import React from 'react';
import './style.scss';
import ListItem from '../ListItem/ListItem';

class List extends React.Component {

  onAnswerChange = (val, quesId) => evt => {
    this.props.onAnswerChange({val, quesId});
  }

  renderQuestionList = () => {
    const {items} = this.props;

    return items.map((item, idx) => {
      return (
        <ListItem key={`item-${item.id}`} item={item}
                  idx={idx + 1}
                  onAnswerChange={val => this.onAnswerChange(val, item.id)}/>
      );
    });
  };

  render() {
    const {items} = this.props;
    if (!items) return null;

    return (
      <div className="list-wrapper">
        {this.renderQuestionList()}
      </div>
    );
  }
}

export default List;
