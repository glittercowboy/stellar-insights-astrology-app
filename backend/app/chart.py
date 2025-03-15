from datetime import datetime, date
from typing import Dict, List, Any, Optional, Union
from pydantic import BaseModel
import immanuel.const
import immanuel.setup
# Removed problematic import: import immanuel.timeline
from immanuel.reports.aspects import get_aspects
from immanuel.reports.planets import get_planets
from immanuel.reports.houses import get_houses
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError

from .utils import convert_time_string

# Initialize geocoder
geolocator = Nominatim(user_agent="stellar-insights-app")

def get_coordinates(city: str, country: str) -> tuple:
    """Get latitude and longitude from city and country names"""
    try:
        location = geolocator.geocode(f"{city}, {country}", exactly_one=True)
        if location:
            return location.latitude, location.longitude
        else:
            raise ValueError(f"Could not find coordinates for {city}, {country}")
    except (GeocoderTimedOut, GeocoderServiceError) as e:
        raise Exception(f"Geocoding service error: {str(e)}")

def create_chart_data(person_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a birth chart using Immanuel library"""
    # Setup the chart
    chart_data = immanuel.setup.calculate_charts(person_data)
    
    # Get planet positions
    planets = get_planets(chart_data)
    
    # Get house information if birth time is known
    houses = None
    if person_data.get("hour") is not None and person_data.get("minute") is not None:
        houses = get_houses(chart_data)
    
    # Get aspects between planets
    aspects = get_aspects(chart_data)
    
    return {
        "planets": planets,
        "houses": houses,
        "aspects": aspects,
        "raw_data": chart_data
    }

def generate_birth_chart(birth_data: BaseModel) -> Dict[str, Any]:
    """Generate a birth chart from the provided birth data"""
    # Get latitude and longitude if not provided
    lat, lng = birth_data.birth_lat, birth_data.birth_lng
    if lat is None or lng is None:
        lat, lng = get_coordinates(birth_data.birth_city, birth_data.birth_country)
    
    # Format data for Immanuel
    birth_date = birth_data.birth_date
    
    person_data = {
        "name": birth_data.name,
        "year": birth_date.year,
        "month": birth_date.month,
        "day": birth_date.day,
        "place": {
            "lat": lat,
            "lng": lng,
            "city": birth_data.birth_city,
            "country": birth_data.birth_country
        }
    }
    
    # Add birth time if provided
    if birth_data.birth_time:
        hours, minutes = convert_time_string(birth_data.birth_time)
        person_data["hour"] = hours
        person_data["minute"] = minutes
    
    # Generate chart
    chart_data = create_chart_data(person_data)
    
    # Format response
    planets_formatted = []
    for planet in chart_data["planets"]:
        planets_formatted.append({
            "name": planet["name"],
            "sign": planet["sign"],
            "degrees": planet["longitude"],
            "house": planet.get("house"),
            "retrograde": planet.get("retrograde", False)
        })
    
    return {
        "planets": planets_formatted,
        "houses": chart_data["houses"],
        "aspects": chart_data["aspects"],
        "chart_svg": None  # Placeholder for future SVG chart
    }
