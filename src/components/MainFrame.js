import Box from "./Box"
import { useEffect, useState } from "react";
import { ToastContainer, toast, Flip } from 'react-toastify';
import "../css/MainFrame.css"

function MainFrame() {

  const setInitiateValue = (hash) => {
    for(let i = 0; i < 9; i++) {
      hash[i] = "";
    }
    return hash;
  }// create an array for 9 boxes

  const initialValue =  setInitiateValue({}); // set initial value
  // const [valueArray, setValueArray] = useState(initialValue); // set initial blank value
  const [valueArray, setValueArray] = useState(initialValue);
  const [team, setTeam] = useState("A"); // set Team
  const [value, setValue] = useState("X"); // set first element to play
  const [status, setStatus] = useState(false) // set statu to check winner or not
  const [gameStarted, setGameStarted] = useState(false) // Reveret the last steps
  const [boxArray, setBoxArray] = useState([]) // set box array
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
    // setValueArray(prevArray =>
    //   prevArray.map((num, i) => (
    //     i === number ? value : num
    //   ))
    // );
    setValueArray((prevArray) => ({
      ...prevArray,
      [number]: value
    }));
    setBoxArray([...boxArray, number])
    setGameStarted(true)
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
        // setValueArray(prevArray =>
          //   prevArray.map((num, i) => (
          //     i === "" ? "-" : num
          //   ))
        // );
        const newValueArray =({...valueArray});
        for(let i = 0; i < 9; i++) {
          if (newValueArray[i] === "") {
            newValueArray[i] = "-";
          }
        }
        setValueArray({...newValueArray});
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
    if( count === 0) {
      setStatus(true)
      toast("Game is over! please revert your last step if there is a doubt or restart the game on button click!")
    }
  }

  const reStart = () => { // restrt the Game
    setValueArray(initialValue);
    setTeam("A");
    setValue("X");
    setStatus(false);
  }

  const revertLastStep = () => { // revert the last step
    const lastStep = boxArray.pop();
    setValueArray((prevArray) => ({
      ...prevArray,
      [lastStep]: ""
    }));
    setStatus(false)
    if (value === "X") {
      setValue("O")
      setTeam("B")
    } else {
      setTeam("A")
      setValue("X")
    }
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
      {
        gameStarted && boxArray.length > 0 &&
        <button className="revertButton" onClick={ () => revertLastStep()}>Revert</button>
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