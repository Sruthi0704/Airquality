from fastapi import APIRouter
import pandas as pd

from app.services.model_loader import (
    DATASET_PATH,
    model_t1,
    model_t2,
    model_t3,
)

from app.utils import get_aqi_info

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    df = pd.read_excel(DATASET_PATH)

    current_aqi = float(df["AQI"].iloc[-1])

    return {
        "current_aqi": current_aqi,

        **get_aqi_info(current_aqi),

        "dataset_rows": len(df),

        "dataset_columns": len(df.columns),

        "latest_timestamp": str(df["timestamp"].iloc[-1]),

        "models_loaded": sum(
            model is not None
            for model in [
                model_t1,
                model_t2,
                model_t3,
            ]
        ),
    }