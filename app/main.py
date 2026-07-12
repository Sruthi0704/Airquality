from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ==========================
# Schemas
# ==========================
from app.schemas import AQIPredictionRequest

# ==========================
# Services
# ==========================
from app.services.predictor import predict_next_3_hours

# ==========================
# Routes
# ==========================
from app.routes.upload import router as upload_router
from app.routes.dataset import router as dataset_router
from app.routes.feature_importance import router as feature_router
from app.routes.metrics import router as metrics_router
from app.routes.dashboard import router as dashboard_router

# ==========================
# FastAPI Application
# ==========================
app = FastAPI(
    title="AQI Prediction API",
    description="Predict Air Quality Index using XGBoost",
    version="1.0.0"
)

# ==========================
# CORS
# ==========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Register Routes
# ==========================
app.include_router(upload_router)
app.include_router(dataset_router)
app.include_router(feature_router)
app.include_router(metrics_router)
app.include_router(dashboard_router)

# ==========================
# Home API
# ==========================
@app.get("/")
def home():
    return {
        "message": "Welcome to AQI Prediction API",
        "status": "Running Successfully"
    }

# ==========================
# Model Status API
# ==========================
@app.get("/model-status")
def model_status():
    return {
        "model_t1": "Loaded",
        "model_t2": "Loaded",
        "model_t3": "Loaded"
    }

# ==========================
# AQI Prediction API
# ==========================
@app.post("/predict")
def predict(data: AQIPredictionRequest):
    return predict_next_3_hours(
        data.aqi_last,
        data.aqi_2hrs_ago,
        data.aqi_3hrs_ago
    )