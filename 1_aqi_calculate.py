import pandas as pd
from pathlib import Path

# =========================================
# FILE PATH
# =========================================
BASE_DIR = Path(__file__).parent
FILE_PATH = BASE_DIR / "Main_Parameters(2020-2024).xlsx"

# =========================================
# LOAD DATA
# =========================================
df = pd.read_excel(FILE_PATH)
df = df.sort_values("timestamp").reset_index(drop=True)

# =========================================
# ADD LONG-TERM AQI MEMORY FEATURES
# =========================================
df['AQI_lag_36'] = df['AQI'].shift(36)
df['AQI_lag_48'] = df['AQI'].shift(48)
df['AQI_roll_mean_48'] = df['AQI'].rolling(48).mean()

# =========================================
# REMOVE NULL ROWS
# =========================================
df.dropna(inplace=True)

# =========================================
# SAVE UPDATED FILE
# =========================================
OUTPUT_FILE = BASE_DIR / "test_output.xlsx"

df.to_excel(OUTPUT_FILE, index=False)

print("Saved successfully:", OUTPUT_FILE)

print("✅ Long-memory AQI features added for t+3")