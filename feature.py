import pandas as pd
import pickle
from pathlib import Path

BASE_DIR = Path(__file__).parent

df = pd.read_excel(
    BASE_DIR / "Main_Parameters(2020-2024).xlsx"
)

exclude_cols = [
    'AQI',
    'AQI_target',
    'timestamp'
]

features = [
    col for col in df.columns
    if col not in exclude_cols
]

with open(BASE_DIR / "features.pkl", "wb") as f:
    pickle.dump(features, f)

print("✅ features.pkl created successfully")
print("Number of features:", len(features))