import pandas as pd
import matplotlib.pyplot as plt
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).parent
FILE_PATH = BASE_DIR / "Main_Parameters(2020-2024).xlsx"

df = pd.read_excel(FILE_PATH)
df = df.sort_values("timestamp").reset_index(drop=True)

df['y_t1'] = df['AQI_target'].shift(-1)
df['y_t2'] = df['AQI_target'].shift(-2)
df['y_t3'] = df['AQI_target'].shift(-3)

df.dropna(inplace=True)

X = df.drop(
    columns=[
        'timestamp',
        'AQI',
        'AQI_target',
        'y_t1',
        'y_t2',
        'y_t3'
    ]
)

split = int(len(df) * 0.8)

X_test = X.iloc[split:]

y1_test = df['y_t1'].iloc[split:]
y2_test = df['y_t2'].iloc[split:]
y3_test = df['y_t3'].iloc[split:]

model_t1 = joblib.load(BASE_DIR / "model_t1.pkl")
model_t2 = joblib.load(BASE_DIR / "model_t2.pkl")
model_t3 = joblib.load(BASE_DIR / "model_t3.pkl")

pred_t1 = model_t1.predict(X_test)
pred_t2 = model_t2.predict(X_test)
pred_t3 = model_t3.predict(X_test)

def plot_actual_vs_predicted(actual, predicted, title):
    plt.figure(figsize=(10, 4))
    plt.plot(actual.values[:200], label="Actual AQI")
    plt.plot(predicted[:200], label="Predicted AQI")
    plt.title(title)
    plt.xlabel("Time Steps")
    plt.ylabel("AQI")
    plt.legend()
    plt.tight_layout()
    plt.show()

plot_actual_vs_predicted(y1_test, pred_t1, "AQI Prediction (t+1)")
plot_actual_vs_predicted(y2_test, pred_t2, "AQI Prediction (t+2)")
plot_actual_vs_predicted(y3_test, pred_t3, "AQI Prediction (t+3)")