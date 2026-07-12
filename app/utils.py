def get_aqi_info(aqi):
    if aqi <= 50:
        return {
            "category": "Good",
            "advice": "Air quality is good. Enjoy outdoor activities."
        }

    elif aqi <= 100:
        return {
            "category": "Moderate",
            "advice": "Air quality is acceptable for most people."
        }

    elif aqi <= 150:
        return {
            "category": "Unhealthy for Sensitive Groups",
            "advice": "Children, elderly, and people with respiratory diseases should reduce prolonged outdoor activities."
        }

    elif aqi <= 200:
        return {
            "category": "Unhealthy",
            "advice": "Wear a mask outdoors and avoid strenuous activities."
        }

    elif aqi <= 300:
        return {
            "category": "Very Unhealthy",
            "advice": "Avoid outdoor activities whenever possible."
        }

    else:
        return {
            "category": "Hazardous",
            "advice": "Stay indoors. Avoid all outdoor exposure."
        }