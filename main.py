from fastapi import FastAPI
import pickle
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(title="House Price Prediction")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("house_price_model.pkl","rb") as f:
    model=pickle.load(f)




class HouseData(BaseModel):
    size_sqft:float
    bedrooms:int

@app.get("/")
def home():
    return {"message": "Welcome to the house price prediction API"}

@app.post("/predict")
def predict_price(data:HouseData):
    features = np.array([[data.size_sqft,data.bedrooms]])
    prediction= model.predict(features)
    return {"predicted_price":float(prediction[0])}

class MultipleHouses(BaseModel):
    houses: list[HouseData]

@app.post("/predict_batch")
def predict_batch(data:MultipleHouses):
    features = np.array([[house.size_sqft, house.bedrooms] for house in data.houses])
    predictions = model.predict(features)
    return {"predicted_prices": predictions.tolist()}