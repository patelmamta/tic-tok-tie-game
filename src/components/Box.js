import Button from "./Button"
import "../css/Box.css"

function Box(props) {
  return (
    <div className="Box" key={"box_" + props.number.toString()}><Button number={props.number} onButtonClick={props.onButtonClick} valueArray={props.valueArray}/></div>
  )
}

export default Box;