import { useState } from "react";
import "../css/Button.css"

function Button({number, onButtonClick, valueArray}) {
  const [disable, setDisable] = useState(
    (valueArray[number] === "") ? false : true
  );

  const onHandleClick = () => {
    onButtonClick(number);
  }


  return (
    <button type="button" className="Button" key={"button_" + number.toString()} disabled={disable} onClick={onHandleClick}>{valueArray[number]}</button>
  );
}

export default Button;