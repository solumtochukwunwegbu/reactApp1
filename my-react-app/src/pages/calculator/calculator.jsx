import { useState, useEffect } from "react";
import "./calculator.css";

export default function CalculatorPage() {
  const [input, setInput] = useState("");

  function append(val) {
    setInput((prev) => prev + val);
  }

  function calculate() {
    try {
      let expression = input.replace(/\^2/g, "**2");

      expression = expression.replace(/√(\d+(\.\d+)?|\([^()]+\))/g, "Math.sqrt($1)");

      expression = expression.replace(/\b0+(\d+)/g, "$1");

      const result = eval(expression);

      setInput(result.toString());
    } catch {
      setInput("Error");
      setTimeout(() => setInput(""), 2000);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      if (/\d/.test(key)) {
        append(key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        append(key);
      } else if (key === ".") {
        append(".");
      } else if (key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        setInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="calculator-container">
      <h1 className="title">Calculator</h1>
      <input className="display" type="text" value={input} readOnly />
      <div className="button-grid">
        {[...Array(10).keys()].map((n) => (
          <button key={n} onClick={() => append(n.toString())}>
            {n}
          </button>
        ))}
        <button onClick={() => append(".")}>.</button>
        <button onClick={() => append("+")}>+</button>
        <button onClick={() => append("-")}>-</button>
        <button onClick={() => append("/")}>/</button>
        <button onClick={() => append("*")}>*</button>

        <button onClick={() => append("^2")}>x²</button>
        <button onClick={() => append("√")}>√</button>
        
        <button className="clear" onClick={() => setInput("")}>
          C
        </button>

        
        <button
          className="backspace"
          onClick={() => setInput((prev) => prev.slice(0, -1))}
        >
          ⌫
        </button>
        
         <button className="equals" onClick={calculate}>
          =
        </button>
      </div>
    </div>
  );
}
