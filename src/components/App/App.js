import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operation, setOperation] = useState(null);



  const buttons = [
    "C", "/", "*", "-",
    "7", "8", "9", "+",
    "4", "5", "6", "=",
    "1", "2", "3", ".",
    "0", "%"
  ];

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      setCurrent((prev) =>
        prev === "0" && value !== "." ? value : prev + value
      );
    } else if (value === "C") {
      setCurrent("0");
      setPrevious(null);
      setOperation(null);
    } else if (["+", "-", "*", "/"].includes(value)) {
      setPrevious(current);
      setCurrent("0");
      setOperation(value);
    }else if(value === "%"){
      setCurrent((prev) => (parseFloat(prev) / 100).toString());
    }else if (value === "=") {
      if (previous && operation) {
        const prevNum = parseFloat(previous);
        const currNum = parseFloat(current);
        let result = 0;

        switch (operation) {
          case "+": result = prevNum + currNum; break;
          case "-": result = prevNum - currNum; break;
          case "*": result = prevNum * currNum; break;
          case "/": result = currNum !== 0 ? prevNum / currNum : "Error"; break;
          default: break;
        }

        if (result.toString().length > 10) {
            result = result.toExponential(6); // 6 знаков после запятой
        }

        setCurrent(result.toString());
        setPrevious(null);
        setOperation(null);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <span className="previous">{previous} {operation}</span>
        {current}
        </div>
      <div className="buttons">
{buttons.map((btn, i) => (
  <button
    key={i}
    onClick={() => handleClick(btn)}
    data-type={
      !isNaN(btn) || btn === "." ? "number" :
      btn === "C" ? "clear" :
      btn === "=" ? "equal" :
      "operator"    
    }
  >
    {btn}
  </button>
))}
      </div>
    </div>
  );
}
