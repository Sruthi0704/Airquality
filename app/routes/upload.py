from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "data"
DATASET_NAME = "Main_Parameters(2020-2024).xlsx"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):

    if not (
        file.filename.endswith(".xlsx")
        or file.filename.endswith(".csv")
    ):
        raise HTTPException(
            status_code=400,
            detail="Only Excel (.xlsx) and CSV files are allowed."
        )

    dataset_path = os.path.join(
        UPLOAD_FOLDER,
        DATASET_NAME
    )

    with open(dataset_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    if file.filename.endswith(".xlsx"):
        df = pd.read_excel(dataset_path)
    else:
        df = pd.read_csv(dataset_path)

    return {
        "message": "Dataset uploaded successfully",
        "rows": len(df),
        "columns": len(df.columns),
        "column_names": list(df.columns)
    }