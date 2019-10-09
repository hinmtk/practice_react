import React,{Component} from 'react';

/*============================================
**
** [class]
** comment
**
**============================================*/
class Comment extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return <p>{this.props.value}</p>
  };
}
export default Comment;

Comment.defaultProps = {
  value:''
};