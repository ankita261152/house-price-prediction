import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import HouseForm from "./components/HouseForm";
import PredictionResult from "./components/PredictionResult";

function App() {
  const [sizeSqft, setSizeSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [prediction, setPrediction] = useState(null);

  const predictPrice = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          size_sqft: Number(sizeSqft),
          bedrooms: Number(bedrooms),
        }
      );

      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>House Price Predictor</h1>

        <HouseForm
          sizeSqft={sizeSqft}
          bedrooms={bedrooms}
          setSizeSqft={setSizeSqft}
          setBedrooms={setBedrooms}
          predictPrice={predictPrice}
        />

        {prediction && (
          <PredictionResult prediction={prediction} />
        )}
      </div>
    </div>
  );
}

export default App;