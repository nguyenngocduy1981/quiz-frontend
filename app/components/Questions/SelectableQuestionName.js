import React from 'react';
import './style.scss';

class SelectableQuestionName extends React.PureComponent {
  render() {
    const { item, idx, className, icon, onClick } = this.props;
    return (
      <h3 className={className}
          onClick={e => onClick({ id: item.id })}>Question {idx} - {item.text} {icon}</h3>
    );
  }
}

export default SelectableQuestionName;
