from pathlib import Path
import joblib
import pandas as pd

# ==========================
# Base Directory
# ==========================
APP_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = APP_DIR.parent

# ==========================
# Paths
# ==========================
MODELS_DIR = APP_DIR / "models"
DATA_DIR = PROJECT_DIR / "data"

DATASET_PATH = DATA_DIR / "Main_Parameters(2020-2024).xlsx"

# ==========================
# Load Trained Models
# ==========================
model_t1 = joblib.load(MODELS_DIR / "model_t1.pkl")
model_t2 = joblib.load(MODELS_DIR / "model_t2.pkl")
model_t3 = joblib.load(MODELS_DIR / "model_t3.pkl")

# ==========================
# Load Dataset
# ==========================
df = pd.read_excel(DATASET_PATH)

# ==========================
# Feature Columns
# ==========================
feature_cols = list(
    df.drop(
        columns=[
            "timestamp",
            "AQI",
            "AQI_target",
        ]
    ).columns
)

# ==========================
# Feature Medians
# ==========================
feature_medians = df[feature_cols].median()