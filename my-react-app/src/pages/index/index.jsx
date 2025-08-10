import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export default function IndexPage() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 0) return;
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <h1>Welcome!!!</h1>
    </div>
  );
}
