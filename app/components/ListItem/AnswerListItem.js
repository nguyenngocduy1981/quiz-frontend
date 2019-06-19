import React from 'react';
import './style.scss';
import QuestionsName from '../Questions/QuestionName';
import { ABC_LIST } from '../../constants/constants';

class AnswerListItem extends React.Component {

  renderPosibleAnswer(posibleAnswers) {
    if (!posibleAnswers) {
      return null;
    }
    return posibleAnswers.map((p, idx) =>
      <span onClick={e => this.props.onClick({ posAnsId: p.id })}
            key={`post_${p.id}`}
            className={`pos_an ${p.selected ? 'selected' : ''}`}
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
    const { item, idx } = this.props;
    if (!item) return null;

    return (
      <div className="list-item-wrapper">
        <QuestionsName text={item.text} idx={idx}/>
        <div className={'posible_answer'}>
          {this.renderPosibleAnswer(item.posibleAnswers)}
        </div>
      </div>
    );
  }
}

export default AnswerListItem;
