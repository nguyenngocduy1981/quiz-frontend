import React from 'react';
import './style.scss';
import SelectableQuestionName from '../Questions/SelectableQuestionName';
import { ABC_LIST } from '../../constants/constants';

class ViewOnlyListItem extends React.Component {

  renderPosibleAnswer(posibleAnswers) {
    if (!posibleAnswers) {
      return null;
    }
    return posibleAnswers.map((p, idx) =>
      <span key={`post_${p.id}`} className='pos_an_view_only'
            dangerouslySetInnerHTML={{ __html: this.renderHtml(p.text, idx) }}
      />,
    );

  }

  renderHtml = (text, idx) => {
    return ABC_LIST[idx] + text
      .replace('#START#', '<span style="text-decoration: underline;">')
      .replace('#END#', '</span>');
  };

  render() {
    const { item, idx, onSelectQuestion } = this.props;
    if (!item) return null;

    return (
      <div className="list-item-wrapper">
        <SelectableQuestionName className={`question-name ${item.selected ? 'selected-question' : ''}`}
                                icon={`${item.selected ? '✔' : ''}`}
                                item={item} idx={idx} onClick={onSelectQuestion}/>
        <div className={'posible_answer'}>
          {this.renderPosibleAnswer(item.posibleAnswers)}
        </div>
      </div>
    );
  }
}

export default ViewOnlyListItem;
