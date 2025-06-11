import { useState } from "react";
import "./calculator.css";

export default function CalculatorPage() {
  let [input, setInput] = useState('');

  function append(val) {
    setInput((prev) => prev + val);
  }

  function calculate() {
  
    input = input.replace(/\b0+(\d+)/g, '$1');
    console.log(input);  // "7+5"

    try {
      setInput(eval(input).toString());
      console.log(eval(input).toString());
    } catch {
      setInput('Error');
      setTimeout(() => setInput(''), 2000);
    }
  }

  return (
    <div className="calculator-container">
      <h1 className="title">Calculator</h1>
      <input className="display" type="text" value={input} readOnly />
      <div className="button-grid">
        {[...Array(10).keys()].map((n) => (
          <button key={n} onClick={() => append(n.toString())}>{n}</button>
        ))}
        <button onClick={() => append('.')}>.</button>
        <button onClick={() => append('+')}>+</button>
        <button onClick={() => append('-')}>-</button>
        <button onClick={() => append('/')}>/</button>
        <button onClick={() => append('*')}>*</button>
        <button className="equals" onClick={calculate}>=</button>
        <button className="clear" onClick={() => setInput('')}>Clear</button>
      </div>
    </div>
  );
}
