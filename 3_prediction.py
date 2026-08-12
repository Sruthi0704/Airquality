import pandas as pd
import joblib
from pathlib import Path
from datetime import datetime

# =========================================
# FILE PATHS
# =========================================
BASE_DIR = Path(__file__).parent

FILE_PATH = BASE_DIR / "Main_Parameters(2020-2024).xlsx"

model_t1 = joblib.load(BASE_DIR / "model_t1.pkl")
model_t2 = joblib.load(BASE_DIR / "model_t2.pkl")
model_t3 = joblib.load(BASE_DIR / "model_t3.pkl")

# =========================================
# LOAD DATA
# =========================================
df = pd.read_excel(FILE_PATH)

feature_cols = df.drop(
    columns=['timestamp', 'AQI', 'AQI_target']
).columns

feature_medians = df[feature_cols].median()

# =========================================
# INPUT FUNCTIONS
# =========================================
def get_valid_date():
    while True:
        try:
            return datetime.strptime(
                input("Enter date (YYYY-MM-DD): "),
                "%Y-%m-%d"
            ).date()
        except ValueError:
            print("❌ Invalid date format.")

def get_valid_time():
    while True:
        try:
            return datetime.strptime(
                input("Enter time (HH:MM): "),
                "%H:%M"
            ).time()
        except ValueError:
            print("❌ Invalid time format.")

def get_valid_aqi(label):
    while True:
        try:
            value = float(input(f"Enter AQI {label}: "))
            if 0 <= value <= 500:
                return value
            print("❌ AQI must be between 0 and 500.")
        except ValueError:
            print("❌ Enter a valid number.")

# =========================================
# PREDICTION
# =========================================
def predict_next_3_hours(aqi_last, aqi_2hrs_ago, aqi_3hrs_ago):

    X = feature_medians.copy()

    X['AQI_lag_1'] = aqi_last
    X['AQI_lag_2'] = aqi_2hrs_ago
    X['AQI_lag_3'] = aqi_3hrs_ago

    X = pd.DataFrame([X])

    return {
        "Next 1 hour AQI":
            round(float(model_t1.predict(X)[0]), 2),

        "Next 2 hours AQI":
            round(float(model_t2.predict(X)[0]), 2),

        "Next 3 hours AQI":
            round(float(model_t3.predict(X)[0]), 2)
    }

# =========================================
# MAIN
# =========================================
if __name__ == "__main__":

    print("\n🌍 AQI PREDICTION SYSTEM")
    print("-" * 35)

    date = get_valid_date()
    time = get_valid_time()

    print("\nEnter AQI values for past 3 hours:")

    aqi_last = get_valid_aqi("(Last Hour)")
    aqi_2hrs_ago = get_valid_aqi("(2 Hours Ago)")
    aqi_3hrs_ago = get_valid_aqi("(3 Hours Ago)")

    prediction = predict_next_3_hours(
        aqi_last,
        aqi_2hrs_ago,
        aqi_3hrs_ago
    )

    print("\n📅 Date:", date)
    print("⏰ Time:", time)

    print("\n🔮 Predicted AQI for Next 3 Hours:")

    for k, v in prediction.items():
        print(f"{k}: {v}")