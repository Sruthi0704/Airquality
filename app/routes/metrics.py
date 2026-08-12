from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parent.parent.parent
METRICS_FILE = BASE_DIR / "data" / "model_metrics.json"


@router.get("/metrics")
def get_metrics():

    if not METRICS_FILE.exists():
        return {
            "message": "Model metrics not found. Train the model first."
        }

    with open(METRICS_FILE, "r") as f:
        metrics = json.load(f)

    return metrics