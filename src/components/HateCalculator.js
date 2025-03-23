import React, { useState } from "react";
import "./Hate.css";

const HateCalculator = () => {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [hatePercent, setHatePercent] = useState(null);
    const [calculating, setCalculating] = useState(false);
    const [hateMessage, setHateMessage] = useState("");
  
    const handleCalculate = () => {
      if (name1.trim() === "" || name2.trim() === "") return;
      setCalculating(true);
      setHatePercent(null);
  
      setTimeout(() => {
        const result = calculateHatePercent(name1, name2);
        setHatePercent(result);
        setHateMessage(getHateMessage(result));
        setCalculating(false);
      }, 2000);
    };
  
    const getHateMessage = (percent) => {
      if (percent >= 80) return "Pure hatred! You should stay far away from each other! 💀";
      if (percent >= 60) return "Intense dislike! This relationship is doomed to fail.";
      if (percent >= 40) return "There's resentment brewing. Consider different paths!";
      if (percent >= 20) return "Mild annoyance, could be worse, but still not great.";
      return "Not much hate here... suspicious. Check again later!";
    };
  
    const calculateHatePercent = (name1, name2) => {
      const yourName = name1.toLowerCase().replace(/\s/g, "").split("");
      const theirName = name2.toLowerCase().replace(/\s/g, "").split("");
      const hates = ["h", "a", "t", "e", "s"];
      const arr = [...yourName, ...theirName, ...hates];
  
      const counts = [];
      const str = arr.join("");
      const visited = new Set();
  
      for (const c of arr) {
        if (!visited.has(c)) {
          visited.add(c);
          counts.push(countOccurrences(str, c));
        }
      }
  
      return reduceToTwoDigits(counts);
    };
  
    const countOccurrences = (str, ch) => {
      let count = 0;
      for (const c of str) {
        if (c === ch) {
          count++;
        }
      }
      return count;
    };
  
    const reduceToTwoDigits = (list) => {
      while (list.length > 2) {
        const newList = [];
        const n = list.length;
        for (let i = 0; i < Math.ceil(n / 2); i++) {
          let sum = list[i];
          if (i !== n - 1 - i) {
            sum += list[n - 1 - i];
          }
          if (sum >= 10) {
            newList.push(Math.floor(sum / 10));
            newList.push(sum % 10);
          } else {
            newList.push(sum);
          }
        }
        list = newList;
      }
      
      // If we end up with only one number, pad with a zero
      if (list.length === 1) {
        return list[0];
      }
      
      return list[0] * 10 + list[1];
    };
  
    return (
      <div className="hate-calculator">
        <h1 className="title">Hate Calculator</h1>
        
        <div className="card">
          <div className="skull-decoration skull-1">👺</div>
          <div className="skull-decoration skull-2">🔪</div>
          
          <div className="input-box">
            <input
              type="text"
              placeholder="Your Name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Enemy's Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
          
          <button className="calculate-btn" onClick={handleCalculate}>
            Calculate
          </button>
  
          {calculating && <div className="loading">💀 Calculating... 💀</div>}
  
          {hatePercent !== null && (
            <div className="hate-result">
              <div className="hate-result-inner">
                Your Hate Score:
                <div className="hate-percentage">
                  {hatePercent}%
                  <div className="percentage-decoration"></div>
                </div>
                <div className="hate-message">{hateMessage}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default HateCalculator;