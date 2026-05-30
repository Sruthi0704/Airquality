# AQI Prediction System using XGBoost

## Overview

This project predicts Air Quality Index (AQI) values for the next 1, 2, and 3 hours using historical air quality data and XGBoost regression models.

The system performs:

* Feature Engineering
* Model Training
* AQI Forecasting
* Actual vs Predicted Visualization

## Dataset

Dataset File:

Main_Parameters(2020-2024).xlsx

The dataset contains:

* Timestamp
* AQI
* AQI Target
* Historical AQI lag features
* Environmental parameters

## Project Structure

Airquality/

├── 1_aqi_calculate.py

├── 2_training.py

├── 3_prediction.py

├── 4_actual_vs_predicted_plot.py

├── feature.py

├── Main_Parameters(2020-2024).xlsx

├── model_t1.pkl

├── model_t2.pkl

├── model_t3.pkl

├── requirements.txt

├── .gitignore

└── README.md

## Workflow

### Step 1: Generate AQI Features

python 1_aqi_calculate.py

### Step 2: Train Models

python 2_training.py

### Step 3: Generate Feature List

python feature.py

### Step 4: Predict AQI

python 3_prediction.py

### Step 5: Plot Results

python 4_actual_vs_predicted_plot.py

## Models Used

* XGBoost Regressor (t+1 prediction)
* XGBoost Regressor (t+2 prediction)
* XGBoost Regressor (t+3 prediction)

## Evaluation Metrics

* MAE (Mean Absolute Error)
* RMSE (Root Mean Squared Error)
* R² Score

## Technologies Used

* Python
* Pandas
* NumPy
* XGBoost
* Scikit-Learn
* Matplotlib
* Joblib

## Author

Sruthi Shakhamuri
