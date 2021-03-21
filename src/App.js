import "./App.css";
import React from "react";
import warehouse from "./images/warehouse.svg";
import customer from "./images/customer.svg";
import bricks from "./images/brick.png";
import arrowf from "./images/arrowf.png";
import arrowb from "./images/arrowb.png";

function App() {
  let [myWares, setMyWares] = React.useState([]);
  let [myPrice, setMyPrice] = React.useState("2.2");
  let [myAmount, setMyAmount] = React.useState("10");
  let [myAmount2, setMyAmount2] = React.useState("0");
  let [check, setCheck] = React.useState(0);
  let [lastTransaction, setLastTransaction] = React.useState(0);
  let [LastTransactionUnit, setLastTransactionUnit] = React.useState(0);
  let averagePrice = 0;
  let approval = "";
  if (lastTransaction !== 0) {
    averagePrice = lastTransaction / LastTransactionUnit;
  }
  //if (myWares.length === 0) {
  //approval = "Approved by Belzebub@2021";
  //}
  let addWare = () => {
    if (
      myPrice >= 0.1 &&
      myPrice <= 1000 &&
      (myPrice * 10) % 1 === 0 &&
      myAmount >= 10 &&
      myAmount % 10 === 0 &&
      myAmount <= 10000
    ) {
      let xxx = [
        ...myWares,
        { price: myPrice, amount: myAmount, id: Math.random() },
      ];
      setMyWares(xxx);
      let myNum = 0;
      for (let i = 0; i < xxx.length; i++) {
        myNum += Number(xxx[i].amount);
      }
      setCheck(myNum);
      setMyAmount("10");
      setMyPrice("2.2");
    } else {
      alert(
        "ERROR! Price per unit must be divisible by 0.1 and amount must be divisible by 10!"
      );
    }
  };
  let inputPrice = (e) => {
    setMyPrice(e.target.value);
  };
  let inputAmount = (e) => {
    setMyAmount(e.target.value);
  };
  let inputAmount2 = (e) => {
    setMyAmount2(e.target.value);
  };
  let deleteWare = (e, f) => {
    setMyWares(myWares.filter((x) => x.id !== e));
    let deleteValue = f;
    setCheck(check - deleteValue);
  };
  let sellWare = () => {
    if (myAmount2 <= check && myAmount2 > "0" && myAmount2 % 10 === 0) {
      setCheck(check - myAmount2);
      setLastTransactionUnit(myAmount2);
      let yyy = myWares.length;
      let additionalAmount = 0;
      let additionalAmount2 = 0;
      myAmount2 = Number(myAmount2);
      for (let i = 0; i < yyy; i++) {
        // if (myAmount2 === 0) {
        //   setMyWares(myWares);
        //   return;
        // }
        if (myAmount2 < Number(myWares[0].amount)) {
          myWares[0].amount = Number(myWares[0].amount) - myAmount2;
          lastTransaction =
            (Number(myAmount2) * (myWares[0].price * 10) +
              additionalAmount * 10) /
            10;
          console.log(lastTransaction);
          setLastTransaction(lastTransaction);
          myAmount2 = 0;
          return;
        } else if (Number(myAmount2) === Number(myWares[0].amount)) {
          lastTransaction =
            (Number(myAmount2) * (myWares[0].price * 10) +
              additionalAmount * 10 +
              additionalAmount2 * 10) /
            10;
          setLastTransaction(lastTransaction);
          myWares = myWares.filter((x) => x !== myWares[0]);
          setMyWares(myWares);
        } else if (Number(myAmount2) > Number(myWares[0].amount)) {
          myAmount2 = myAmount2 - Number(myWares[0].amount);
          additionalAmount = Number(
            additionalAmount +
              (myWares[0].amount * (myWares[0].price * 10)) / 10
          );
          setLastTransaction(lastTransaction);
          console.log("usuń");
          myWares = myWares.filter((x) => x !== myWares[0]);
          setMyWares(myWares);
        }
      }
    } else {
      alert(
        "ERROR! Wrong amount! Make sure, that your amount is higher than 0, divisible by 10 and lower or equal to avaiable wares!"
      );
    }
  };
  return (
    <div>
      <div className="header">
        <img alt="" src={warehouse} height="70" />
        <div className="wh">React Warehouse</div>
      </div>
      <div className="counterContainer">
        <div className="counter">
          <div>Wares avaiable: {check} units</div>
          <div>* * *</div>
          <div>Last transaction: </div>
          <div>{LastTransactionUnit} units</div>
          <div>{lastTransaction} zł</div>
          <div>Average price per unit: {averagePrice.toFixed([2])} zł</div>
        </div>
      </div>
      <div className="container">
        <div className="received">
          <div className="bigger">Add</div>
          <div className="form">
            <div>Price per unit:</div>
            <input
              //value={myPrice}
              onChange={inputPrice}
              value={myPrice}
              type="number"
              step="0.1"
              min="0.1"
              max="1000"
              className="myInput"
            />
          </div>
          <div className="form">
            <div>Amount:</div>
            <input
              //value={myAmount}
              onChange={inputAmount}
              value={myAmount}
              type="number"
              step="10"
              min="10"
              max="10000"
              className="myInput"
            />
          </div>
          <button
            className="myButton"
            onClick={() => {
              addWare();
            }}
          >
            Add
          </button>
        </div>
        <div className="queue">
          <div>Customer</div>
          <img className="customer" alt="" src={customer} />
          <img alt="" src={arrowf} />
          <div className="orders">
            {myWares.map((x) => (
              <div>
                <img width="150" alt="" src={bricks} />
                <div className="centered">
                  <div>{x.price} zł/unit</div>
                  <div>
                    {x.amount} units{" "}
                    <button
                      className="delButton"
                      onClick={() => {
                        deleteWare(x.id, x.amount);
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div>Value: {(x.amount * (x.price * 10)) / 10} zł</div>
                </div>
              </div>
            ))}
          </div>
          <img alt="" src={arrowb} />
        </div>
        <div className="issued">
          <div className="bigger">Issue</div>
          <div className="form">
            <div>Amount:</div>
            <input
              onChange={inputAmount2}
              value={myAmount2}
              type="number"
              step="10"
              min="10"
              max="10000"
              className="myInput"
            />
          </div>
          <button className="myButton" onClick={sellWare}>
            Sell
          </button>
        </div>
      </div>
      <div className="approval">
        <div>{approval}</div>
      </div>
    </div>
  );
}

export default App;
