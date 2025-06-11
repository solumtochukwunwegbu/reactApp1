import { useState, useEffect } from "react";
import "./calculator.css";

export default function CalculatorPage() {
  let [input, setInput] = useState('');

  function append(val) {
    setInput((prev) => prev + val);
  }

  function calculate() {
    const sanitizedInput = input.replace(/\b0+(\d+)/g, '$1');
    try {
      setInput(eval(sanitizedInput).toString());
    } catch {
      setInput('Error');
      setTimeout(() => setInput(''), 2000);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { key } = e;

      if (/\d/.test(key)) {
        append(key); // numbers
      } else if (['+', '-', '*', '/'].includes(key)) {
        append(key); // operators
      } else if (key === '.') {
        append('.'); // decimal
      } else if (key === 'Enter') {
        e.preventDefault();
        calculate(); // equals
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1)); // remove last char
      } else if (key === 'Escape') {
        setInput(''); // clear
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

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
