from fastapi import APIRouter
import pandas as pd
import os

router = APIRouter()

DATA_FOLDER = "data"


@router.get("/dataset-info")
def dataset_info():

    files = [
        f for f in os.listdir(DATA_FOLDER)
        if f.endswith(".xlsx") or f.endswith(".csv")
    ]

    if not files:
        return {
            "message": "No dataset found."
        }

    latest_file = files[0]
    file_path = os.path.join(DATA_FOLDER, latest_file)

    if latest_file.endswith(".xlsx"):
        df = pd.read_excel(file_path)
    else:
        df = pd.read_csv(file_path)

    return {
        "filename": latest_file,
        "rows": len(df),
        "columns": len(df.columns),
        "missing_values": int(df.isnull().sum().sum()),
        "column_names": list(df.columns)
    }