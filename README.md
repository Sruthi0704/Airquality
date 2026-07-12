# AirVision AI

AirVision AI is a web application that predicts the Air Quality Index (AQI) for the next 1, 2, and 3 hours using XGBoost machine learning models. The project combines a FastAPI backend with a React frontend to provide accurate predictions, interactive visualizations, and model insights through a modern dashboard.

## Features

- Predict AQI for the next 1, 2, and 3 hours
- Interactive dashboard with AQI statistics
- AQI trend visualization
- Health advice based on predicted AQI
- Model performance metrics
- Feature importance analysis
- Dataset information and upload support
- REST API built with FastAPI

## Technologies Used

### Frontend

- React
- Tailwind CSS
- Vite
- Axios
- Recharts
- React Icons

### Backend

- FastAPI
- Python
- Pandas
- NumPy
- XGBoost
- Joblib
- Uvicorn

## Project Structure

```
Airquality
│
├── app
│   ├── routes
│   ├── services
│   ├── main.py
│   └── schemas.py
│
├── data
│
├── models
│
├── aqi-frontend
│
├── 2_training.py
│
└── README.md
```

## Installation

Clone the repository

```bash
git clone https://github.com/Sruthi0704/Airquality.git
```

Move into the project folder

```bash
cd Airquality
```

Create a virtual environment

```bash
python -m venv .venv
```

Activate the environment

Windows

```bash
.venv\Scripts\activate
```

Install the required packages

```bash
pip install -r requirements.txt
```

Start the backend server

```bash
uvicorn app.main:app --reload
```

The backend will run on

```
http://127.0.0.1:8000
```

Open another terminal and start the frontend

```bash
cd aqi-frontend
```

```bash
npm install
```

```bash
npm run dev
```

The frontend will run on

```
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Home |
| GET | /dashboard | Dashboard information |
| POST | /predict | Predict AQI |
| GET | /metrics | Model performance |
| GET | /feature-importance | Feature importance |
| GET | /dataset-info | Dataset information |
| POST | /upload | Upload dataset |

## Machine Learning

The project uses three independently trained XGBoost regression models.

- Model 1 predicts AQI after 1 hour.
- Model 2 predicts AQI after 2 hours.
- Model 3 predicts AQI after 3 hours.

The models are evaluated using:

- Mean Absolute Error (MAE)
- Root Mean Squared Error (RMSE)
- R² Score

## Dashboard

The dashboard includes:

- Current AQI
- AQI category
- Health advice
- AQI trend chart
- Model accuracy
- Latest dataset information

## Future Improvements

- Live AQI API integration
- Weather data integration
- Historical prediction analysis
- Download prediction reports
- User authentication
- Dark mode

## Author

Sruthi Shakhamuri

GitHub: https://github.com/Sruthi0704

LinkedIn: https://www.linkedin.com/in/shakhamuri-sruthi-44a597303/
