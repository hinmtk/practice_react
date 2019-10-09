import React,{Component} from 'react';
import ItemList from './itemList.jsx';
import InputMoneyList from './inputMoneyList.jsx';
import Comment from './comment.jsx';

/*============================================
**
** [class]
** VendingMachine
**
**============================================*/
class VendingMachine extends React.Component{
  constructor(props){
    super(props);
    this.state={
      money:0,
      commentArr:['コメントが入ります']
    }
    this.onClickInputMoneyBtn = this.onClickInputMoneyBtn.bind(this);
    this.onClickCartBtn = this.onClickCartBtn.bind(this);
  }

  /*----------------------
  ** onClickInputMoneyBtn
  ** お金投入ボタンをクリックしたとき
  **----------------------*/
  onClickInputMoneyBtn(money){
    var totalMoney = money + this.state.money;
    this.setState({
      money:totalMoney
    });
  }

  /*----------------------
  ** onClickCartBtn
  ** 購入ボタンをクリックしたとき
  **----------------------*/
  onClickCartBtn(stock,price,name){

    var isBuy = true;

    if(stock < 1){
      alert('在庫がありません');
      isBuy = false;
      return isBuy;
    }

    if(this.state.money < price){
      alert('投入金額が足りません');
      isBuy = false;
      return isBuy;
    }else{
      var totalMoney = this.state.money - price;
      this.setState({
        money:totalMoney
      });
    }
    var comment = name + 'を購入しました。';
    var commentArr = this.state.commentArr;
    var regExp = new RegExp('コメント');
    if(regExp.test(commentArr[0])){
      commentArr = [];
    }
    commentArr.push(comment);
    this.setState({
      commentArr:commentArr
    });

    return isBuy;


  }


  /*======================
  ** render
  **======================*/
  render(){

    {/* アイテムリストのデータ */}
    var listNum = 6;
    var nameArr = ['ぴよぴよ1','ぴよぴよ2','ぴよぴよ3','ぴよぴよ4','ぴよぴよ5','ぴよぴよ6'];
    var stockArr = [2,4,5,3,1,1];
    var priceArr = [80,100,110,120,170,200];
    var stateArr = [true,true,true,true,true,true];

    {/* 投入金額のデータ */}
    var inputMoneyArr = [50,100,500,1000];

    var itemList = nameArr.map(function(value,i){
      return <ItemList
        key={'item-' + i}
        itemNo = {i+1}
        listNum = {listNum}
        name = {nameArr[i]}
        stock = {stockArr[i]}
        price = {priceArr[i]}
        state = {stateArr[i]}
        money = {this.state.money}
        onClickCartBtn = {this.onClickCartBtn}
        />
    }.bind(this));

    var moneyList = inputMoneyArr.map(function(value,i){
      return <InputMoneyList key={'moneyList-' + value} money={value} onClickInputMoneyBtn={this.onClickInputMoneyBtn} />
    }.bind(this));

    var commentList = this.state.commentArr.map(function(value,i){
      return <Comment key={'comment-' + value + i} value={value} />
    }.bind(this));

    return <div>
      <h1 className="content_title">test</h1>
      <section className="content">
        {/* アイテムリスト */}
        <ul className="itemsArea">
          {itemList}
        </ul>
        {/**/}
        <div className="inputArea">
          <div className="inputArea_inner">
            <h3>投入金額</h3>
            <p className="inputArea_moneyPutIn"><span>{this.state.money}</span>円</p>
            <p className="inputArea_subTitle">お金を入れる</p>
            <ul className="inputArea_wallet">
              {/*投入金額リスト*/}
              <ul className="inputArea_wallet">
                {moneyList}
              </ul>
              {/**/}
            </ul>
          </div>
        </div>
      </section>
      <section className="commentArea">
        <h2>コメント</h2>
        <div className="commentArea_wrap">
          <div className="commentArea_inner">
            {commentList}
          </div>
        </div>
      </section>
    </div>
  };
}
export default VendingMachine;