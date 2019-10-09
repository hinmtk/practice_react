import React,{Component} from 'react';

/*============================================
**
** [class]
** InputMoneyList
**
**============================================*/
class InputMoneyList extends React.Component{
  constructor(props) {
    super(props);
    this.onClickInputMoneyBtn = this.onClickInputMoneyBtn.bind(this);
  }

  onClickInputMoneyBtn(){
    this.props.onClickInputMoneyBtn(this.props.money);
  }

  render(){
    return <li key={'money-' + this.props.money} onClick={this.onClickInputMoneyBtn}>&yen;{this.props.money}</li>
  };
}
export default InputMoneyList;

InputMoneyList.defaultProps = {
  money:0
};