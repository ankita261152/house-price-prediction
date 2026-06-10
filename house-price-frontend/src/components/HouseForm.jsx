import React from "react";

function HouseForm({
  sizeSqft,
  bedrooms,
  setSizeSqft,
  setBedrooms,
  predictPrice,
}) {
  return (
    <form onSubmit={predictPrice}>
      <label>House Size (sqft)</label>
      <input
        type="number"
        value={sizeSqft}
        onChange={(e) => setSizeSqft(e.target.value)}
        required
      />

      <label>Bedrooms</label>
      <input
        type="number"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
        required
      />

      <button type="submit">Predict Price</button>
    </form>
  );
}

export default HouseForm;