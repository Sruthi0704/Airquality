import pandas as pd
import numpy as np
import joblib
from pathlib import Path
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

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
# CREATE FUTURE TARGETS
# =========================================
df['y_t1'] = df['AQI_target'].shift(-1)
df['y_t2'] = df['AQI_target'].shift(-2)
df['y_t3'] = df['AQI_target'].shift(-3)

df.dropna(inplace=True)

# =========================================
# FEATURES & TARGETS
# =========================================
X = df.drop(columns=[
    'timestamp',
    'AQI',
    'AQI_target',
    'y_t1',
    'y_t2',
    'y_t3'
])

y1 = df['y_t1']
y2 = df['y_t2']
y3 = df['y_t3']

# =========================================
# TRAIN TEST SPLIT
# =========================================
split = int(len(df) * 0.8)

X_train, X_test = X.iloc[:split], X.iloc[split:]
y1_train, y1_test = y1.iloc[:split], y1.iloc[split:]
y2_train, y2_test = y2.iloc[:split], y2.iloc[split:]
y3_train, y3_test = y3.iloc[:split], y3.iloc[split:]

# =========================================
# MODELS
# =========================================
model_t1 = XGBRegressor(
    n_estimators=400,
    learning_rate=0.05,
    max_depth=5,
    subsample=0.9,
    colsample_bytree=0.9,
    objective='reg:squarederror',
    random_state=42,
    n_jobs=-1
)

model_t2 = XGBRegressor(
    n_estimators=500,
    learning_rate=0.04,
    max_depth=6,
    subsample=0.85,
    colsample_bytree=0.85,
    objective='reg:squarederror',
    random_state=42,
    n_jobs=-1
)

model_t3 = XGBRegressor(
    n_estimators=600,
    learning_rate=0.035,
    max_depth=7,
    subsample=0.8,
    colsample_bytree=0.8,
    objective='reg:squarederror',
    random_state=42,
    n_jobs=-1
)

# =========================================
# TRAIN
# =========================================
model_t1.fit(X_train, y1_train)
model_t2.fit(X_train, y2_train)
model_t3.fit(X_train, y3_train)

# =========================================
# PREDICT
# =========================================
pred_t1 = model_t1.predict(X_test)
pred_t2 = model_t2.predict(X_test)
pred_t3 = model_t3.predict(X_test)

# =========================================
# EVALUATION
# =========================================
def evaluate(y_true, y_pred, label):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)

    print(f"\n📊 AQI Prediction {label}")
    print(f"MAE  : {mae:.2f}")
    print(f"RMSE : {rmse:.2f}")
    print(f"R²   : {r2:.3f}")

evaluate(y1_test, pred_t1, "t+1")
evaluate(y2_test, pred_t2, "t+2")
evaluate(y3_test, pred_t3, "t+3")

# =========================================
# SAVE MODELS
# =========================================
joblib.dump(model_t1, BASE_DIR / "model_t1.pkl")
joblib.dump(model_t2, BASE_DIR / "model_t2.pkl")
joblib.dump(model_t3, BASE_DIR / "model_t3.pkl")

print("\n✅ Models trained and saved successfully")