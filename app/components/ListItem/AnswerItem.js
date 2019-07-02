import React from 'react';
import './style.scss';
import {ABC_LIST, QUESTION_OPTION_TYPES, QUESTION_TEXT_TYPES} from '../../constants/constants';

class AnswerItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  componentDidMount() {
    const {item} = this.props;
    if (item.answered && QUESTION_TEXT_TYPES.includes(item.type)) {
      this.setState({inputText: item.answered});
    }
  }

  onInputChange = (evt) => {
    const inputText = evt.target.value;
    this.setState({inputText});
  }

  renderAnswer(ques) {
    if (QUESTION_OPTION_TYPES.includes(ques.type)) {
      return this.renderPossibleAnswer(ques);
    }

    return this.renderTextBoxAnswer();
  }

  renderTextBoxAnswer() {
    return (
      <span className={'pos_an'}>
        <input type='text' className={'text-control'}
               value={this.state.inputText}
               onChange={this.onInputChange}
               onBlur={
                 this.props.onAnswerChange(this.state.inputText)
               }/>


      </span>
    );
  }

  renderPossibleAnswer(ques) {
    if (!ques.possibleAnswers) {
      return null;
    }

    return this.renderEditablePossibleAnswer(ques);
  }

  renderEditablePossibleAnswer(ques) {
    const {possibleAnswers} = ques;
    return possibleAnswers.map((p, idx) =>
      <span onClick={this.props.onAnswerChange(p)}
            key={`post_${idx}`}
            className={`pos_an ${ques.answered === p ? 'selected' : ''}`}
            dangerouslySetInnerHTML={{__html: this.renderHtml(p, idx)}}
      />,
    );
  }

  renderHtml = (text, idx) => {
    return ABC_LIST[idx] + text
      .replace('#START#', '<span style="text-decoration: underline;">')
      .replace('#END#', '</span>');
  };

  render() {
    const {item} = this.props;
    if (!item) return null;

    return (
      this.renderAnswer(item)
    );
  }
}

export default AnswerItem;
