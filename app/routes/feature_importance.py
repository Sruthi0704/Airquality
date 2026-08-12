from fastapi import APIRouter
from app.services.model_loader import model_t1, feature_cols

router = APIRouter()


@router.get("/feature-importance")
def feature_importance():

    importance = model_t1.feature_importances_

    result = []

    for feature, score in zip(feature_cols, importance):
        result.append({
            "feature": feature,
            "importance": round(float(score), 4)
        })

    result.sort(
        key=lambda x: x["importance"],
        reverse=True
    )

    return result