import React from "react";

function PredictionResult({ prediction }) {
  return (
    <div className="result">
      <h2>Predicted Price</h2>
      <p>₹ {prediction.toLocaleString()}</p>
    </div>
  );
}

export default PredictionResult;