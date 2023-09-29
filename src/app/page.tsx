"use client";

import styles from "./page.module.css";
import { useState } from "react";

function calc(probability: number, nperhour: number) {
  var overallProb = 1.0 - (1.0 - probability) ** nperhour;
  var i = 1;
  while (overallProb < 0.99) {
    nperhour += nperhour;
    i += 1;
    overallProb = 1 - (1 - probability) ** nperhour;
  }
  return [i, overallProb];
}

export default function Home() {
  const [result, setResult] = useState([0, 0] as [number, number] | null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    var result = calc(eval(event.target[0].value), parseFloat(event.target[1].value));
    console.log(result);
    setResult([result[0], result[1]]);
  };
  return (
    <div className={styles.main}>
      <h1>Melvor Idle Drop Chance Calculator</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label className={styles.label}>Probability</label>
          <input
            type="probability"
            placeholder="1/P"
            id="username"
            className={styles.input}></input>
        </p>
        <p>
          <label className={styles.label}>Action per hour</label>
          <input
            type="actionperhour"
            placeholder="X"
            id="password"
            className={styles.input}></input>
        </p>
        <button
          type="submit"
          className={styles.button}>
          <p className={styles.buttonText}>Submit</p>
        </button>
      </form>
      {result && (
        <p className={styles.result}>
          You will have a {(result[1] * 100).toFixed(2)}% chance of getting the item after{" "}
          {result[0]} hours.
        </p>
      )}
    </div>
  );
}
