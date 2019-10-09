import React,{Component} from 'react';

class View extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      item:[
        {
          name:"アイテム1",
          img:"./img/item1.jpg",
          stock:"5",
          price:80,
          button:"on"
        },
        {
          name:"アイテム2",
          img:"./img/item2.jpg",
          stock:2,
          price:100,
          button:"on"
        },
        {
          name:"アイテム3",
          img:"./img/item3.jpg",
          stock:4,
          price:110,
          button:"on"
        },
        {
          name:"アイテム4",
          img:"./img/item4.jpg",
          stock:1,
          price:120,
          button:"on"
        },
        {
          name:"アイテム5",
          img:"./img/item5.jpg",
          stock:1,
          price:170,
          button:"on"
        },
        {
          name:"アイテム6",
          img:"./img/item6.jpg",
          stock:1,
          price:200,
          button:"on"
        }
      ],
      money:0,
      inputMoney:[50,100,500,1000],
      comment:['ここにコメントが入ります']
    };

    this.getElem = this.getElem.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.getObjLength = this.getObjLength.bind(this);
    this.onClickMoneyInput = this.onClickMoneyInput.bind(this);
    this.onClickCartBtn = this.onClickCartBtn.bind(this);
  }

  onClickMoneyInput(e){
    var totalMoney = this.state.money + e.target.value;
    this.setState({
      money:totalMoney
    });
  }

  getElem(arr,className){
    let elem;
    for(let i in arr){
      let _className = arr[i].className;
      let regEx = new RegExp(className);
      if(regEx.test(_className)){
        elem = arr[i];
        break;
      }
    }
    return elem;
  }

  //let index = this.getIndex(elem);
  getIndex(target){
    let parent = target.parentNode;
    let children = parent.childNodes;
    let tag = target.tagName;
    if(target.previousSibling){
      let t = target;
      for(let i in children){
        if(children[i] == target){
          return i;
        }
      }
    }else{
      return 0;
    }
  }

  //let len = this.getObjLength(elem);
  getObjLength(target){
    let tag = target.tagName;
    let parent = target.parentNode;
    let children = parent.childNodes;
    let num = 0;
    for(let i=0,len=children.length; i<len; i++){
      if(children[i].tagName == tag){
        num++;
      }
    }
    return num;
  }

  onClickCartBtn(e){
    let stock = e.target.parentNode;
    const stockCild = stock.childNodes;
    let Li = stock.parentNode.childNodes;
    let button = 'on';

    let elemStock = this.getElem(stockCild,'itemsArea_item-stock').childNodes;
    elemStock = this.getElem(elemStock,'itemsArea_item-num');
    let stockNum = Number(elemStock.textContent);

    let elemPrice = this.getElem(stockCild,'itemsArea_item-price').childNodes;
    elemPrice = this.getElem(elemPrice,'itemsArea_item-num');
    let price = elemPrice.textContent.slice(1);

    if(stockNum == 0){
      alert('在庫がありません');
      return;
    }else if(this.state.money < price){
      alert('投入金額が足りません');
      return;
    }

    let index = this.getIndex(stock);

    let stateItemArr = [];
    let itemName = '';
    for(let i=0,len=this.state.item.length; i<len; i++){
      if(index == i){
        itemName = this.state.item[i].name;
        stockNum = this.state.item[i].stock -1;
      }else{
        stockNum = this.state.item[i].stock;
      }
      button = stockNum < 1 ? 'off' : 'on';
      let stateItem = {
        name:this.state.item[i].name,
        img:this.state.item[i].img,
        stock:stockNum,
        price:this.state.item[i].price,
        button:button,
      }
      stateItemArr.push(stateItem);
    }

    let comment = '「' + itemName + '」を購入しました。';
    let commentArr = this.state.comment;
    if(/ここにコメントが入ります/.test(this.state.comment[0])){
      commentArr = [comment];
    }else{
      commentArr.push(comment);
    }

    console.log(commentArr);

    this.setState({
      item:stateItemArr,
      money:this.state.money-price,
      comment:commentArr
    });

  }

  render(){
    var item = this.state.item.map(function(i){
      var buttonClassName = "itemsArea_item-button " + i.button;
      return <li key={i.name} className={i.button}>
        <img src={i.img} alt=""></img>
        <p className="itemsArea_item-name">{i.name}</p>
        <p className="itemsArea_item-stock itemsArea_item-pickup"><span>在庫 : </span><span className="itemsArea_item-num">{i.stock}</span></p>
        <p className="itemsArea_item-price itemsArea_item-pickup"><span>値段 : </span><span className="itemsArea_item-num">&yen;{i.price}</span></p>
        <p className={buttonClassName} onClick={this.onClickCartBtn}>購入</p>
      </li>
    }.bind(this));

    var inputMoney = this.state.inputMoney.map(function(i){
      return <li key={i} value={i} onClick={this.onClickMoneyInput}>&yen;{i}</li>
    }.bind(this));

    var comment = this.state.comment.map(function(value,i){
      return <p key={i}>{value}</p>
    }.bind(this));

    return <div>
      <h1 className="content_title">test</h1>
      <section className="content">
        <ul className="itemsArea">
          {item}
        </ul>
        <div className="inputArea">
          <div className="inputArea_inner">
            <h3>投入金額</h3>
            <p className="inputArea_moneyPutIn"><span>{this.state.money}</span>円</p>
            <p className="inputArea_subTitle">お金を入れる</p>
            <ul className="inputArea_wallet">
              {inputMoney}
            </ul>
          </div>
        </div>
      </section>
      <section className="commentArea">
        <h2>コメント</h2>
        <div className="commentArea_wrap">
          <div className="commentArea_inner">
            {comment}
          </div>
        </div>
      </section>
    </div>
  };
}
export default View;