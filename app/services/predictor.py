from app.utils import get_aqi_info
import pandas as pd

from app.services.model_loader import (
    model_t1,
    model_t2,
    model_t3,
    feature_medians
)


def predict_next_3_hours(aqi_last, aqi_2hrs_ago, aqi_3hrs_ago):
    # Copy the median values
    X = feature_medians.copy()

    # Update only the AQI lag features
    X["AQI_lag_1"] = aqi_last
    X["AQI_lag_2"] = aqi_2hrs_ago
    X["AQI_lag_3"] = aqi_3hrs_ago

    # Convert to DataFrame
    X = pd.DataFrame([X])

    # Predict
    prediction_t1 = round(float(model_t1.predict(X)[0]), 2)
    prediction_t2 = round(float(model_t2.predict(X)[0]), 2)
    prediction_t3 = round(float(model_t3.predict(X)[0]), 2)

    return {
        "next_1_hour": {
            "aqi": prediction_t1,
            **get_aqi_info(prediction_t1)
        },
        "next_2_hours": {
            "aqi": prediction_t2,
            **get_aqi_info(prediction_t2)
        },
        "next_3_hours": {
            "aqi": prediction_t3,
            **get_aqi_info(prediction_t3)
        }
    }