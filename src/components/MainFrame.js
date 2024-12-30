import Box from "./Box"
import { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from 'react-toastify';
import "../css/MainFrame.css"

function MainFrame() {
  const initialValue =  new Array(9).fill(""); // create an array for 9 boxes
  const [valueArray, setValueArray] = useState(initialValue); // set initial blank value
  const [team, setTeam] = useState("A"); // set Team
  const [value, setValue] = useState("X"); // set first element to play
  const [status, setStatus] = useState(false) // set statu to check winner or not
  const LoopFrame = () => { //create 9 box using this loop
    return (
      [...Array(9)].map(( _, index) => (
        <Box number={index} onButtonClick={onButtonClick} valueArray={valueArray}/>
      ))
    )
  }

  const onButtonClick = (number) => { // on button click set the user clikc value and check the winner
    if (value === "X") {
      setValue("O")
      setTeam("B")
    } else {
      setTeam("A")
      setValue("X")
    }
    setValueArray(prevArray =>
      prevArray.map((num, i) => (
        i === number ? value : num
      ))
    );
  }


  const checkWinner = () => { // check winner
    const list =  [
                  [0,1,2],
                  [3,4,5],
                  [6,7,8],
                  [0,3,6],
                  [1,4,7],
                  [2,5,8],
                  [0,4,8],
                  [2,4,6]
                ];
    let count = 0;
    for (let i = 0; i < list.length; i++) {
      const [a, b, c] = list[i];
      if((valueArray[a] === valueArray[b]) && (valueArray[a] === valueArray[c]) && (valueArray[a] !== "" && valueArray[a] !== "-")) {
        setValueArray(prevArray =>
          prevArray.map((num, i) => (
            num === "" ? "-" : num
          ))
        );
        setStatus(true)
        toast(
          <div className="winnerText">Winner Team  😍
          <div className="teamName"> {(valueArray[a] === "X" ? "A" : "B") } </div></div>
        )
      } else {
        if((valueArray[a] === "") || (valueArray[b] === "") || (valueArray[c] === "")) {
          count += 1
        }
      }
    }
    console.log(count, status)
    if( count === 0) {
      setStatus(true)
      toast("Game is over! please restart it on button click!")
    }
  }

  const reStart = () => { // restrt the Game
    setValueArray(initialValue);
    setTeam("A");
    setValue("X");
    setStatus(false);
  }

  useEffect(() => { // call back to check the winner after changing the value state
    checkWinner();
  }, [value]);

  return (
    <div className="Board">
      <h1> Tic Tac Toe Game</h1>
      {
        status ?
        (
          <>
          <div className="labelText">Game is Over 😜</div>
          <button className="restartButton" onClick={ () => reStart()}>Restart</button>
          </>
        )
        :
        <p>Team <b>{team}</b> Turn</p>
      }
      <ToastContainer
        position="top-center"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Flip}
      />
      <div className="MainFrame">
        <LoopFrame />
      </div>
    </div>
  )
}

export default MainFrame;