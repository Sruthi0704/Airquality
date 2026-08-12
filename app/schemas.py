from pydantic import BaseModel, Field


class AQIPredictionRequest(BaseModel):
    aqi_last: float = Field(..., ge=0, le=500)
    aqi_2hrs_ago: float = Field(..., ge=0, le=500)
    aqi_3hrs_ago: float = Field(..., ge=0, le=500)