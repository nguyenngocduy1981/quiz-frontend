import React from 'react';
import './style.scss';
import AnswerItem from './AnswerItem';

class ListItem extends React.Component {
  render() {
    const {item, idx, onAnswerChange} = this.props;
    if (!item) return null;

    return (
      <div className="list-item-wrapper">
        <h3 className={'question-name-view-only'}>Question {idx} - {item.text}</h3>
        <div className={'posible_answer'}>
          <AnswerItem item={item} editable
                      onAnswerChange={onAnswerChange}
          />
        </div>
      </div>
    );
  }
}

export default ListItem;
