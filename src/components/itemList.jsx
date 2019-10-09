import React,{Component} from 'react';

/*============================================
**
** [class]
** ItemList
**
**============================================*/
class ItemList extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      stock:this.props.stock,
      state:this.props.state
    }
    this.onClickCartBtn = this.onClickCartBtn.bind(this);
    this.setStock = this.setStock.bind(this);
    this.setBtnState = this.setBtnState.bind(this);
  }

  /*----------------------
  ** onClickCartBtn
  ** 購入ボタンを押したとき
  **----------------------*/
  onClickCartBtn(){
    var isBuy = this.props.onClickCartBtn(this.state.stock,this.props.price,this.props.name);
    if(isBuy) this.setStock();
  }

  /*----------------------
  ** setStock
  ** 在庫を親のvendingMathineから取得
  **----------------------*/
  setStock(){

    var stock = this.state.stock - 1;
    this.setState({
      stock:stock
    },function(){
      this.setBtnState();
    });
  }

  /*----------------------
  ** setBtnState
  ** 購入ボタンのクラスを出し分け
  **----------------------*/
  setBtnState(){
    if(this.state.stock < 1){
      this.setState({
        state:false
      });
    }
  }

  /*======================
  ** render
  **======================*/
  render(){

    return <li key={'item-' + this.props.itemNo} className={this.state.state}>
      <img src={'./img/item'+ this.props.itemNo +'.jpg'} alt=""></img>
      <p className="itemsArea_item-name">{this.props.name}</p>
      <p className="itemsArea_item-stock itemsArea_item-pickup"><span>在庫 : </span><span className="itemsArea_item-num">{this.state.stock}</span></p>
      <p className="itemsArea_item-price itemsArea_item-pickup"><span>値段 : </span><span className="itemsArea_item-num">&yen;{this.props.price}</span></p>
      <p className={"itemsArea_item-button " + (this.state.state ? 'on' : 'off')} onClick={this.onClickCartBtn}>購入</p>
    </li>
  };
};
export default ItemList;

ItemList.defaultProps = {
  name:'',
  stock:0,
  price:0,
  state:false,
  onClickInputMoneyBtn:function(){
    console.log('functionの設定がありません');
  }
};