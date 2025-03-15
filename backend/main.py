from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from datetime import datetime, date
import os
from dotenv import load_dotenv
import uvicorn
from typing import Optional, List, Dict, Any

# Import our app modules
from app.chart import generate_birth_chart
from app.reading import generate_reading

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Stellar Insights API",
    description="API for generating astrological birth charts and readings",
    version="0.1.0"
)

# Configure CORS
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input models
class BirthData(BaseModel):
    name: str
    birth_date: date
    birth_time: Optional[str] = None
    birth_city: str
    birth_country: str
    birth_lat: Optional[float] = None
    birth_lng: Optional[float] = None

# Response models
class PlanetInfo(BaseModel):
    name: str
    sign: str
    degrees: float
    house: Optional[int] = None
    retrograde: bool = False

class ChartResponse(BaseModel):
    planets: List[PlanetInfo]
    houses: Optional[List[Dict[str, Any]]] = None
    aspects: Optional[List[Dict[str, Any]]] = None
    chart_svg: Optional[str] = None

class ReadingResponse(BaseModel):
    content: str

class ChartAndReadingResponse(BaseModel):
    chart: ChartResponse
    reading: ReadingResponse

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Stellar Insights API"}

@app.post("/api/chart", response_model=ChartResponse)
async def create_chart(birth_data: BirthData):
    try:
        chart_data = generate_birth_chart(birth_data)
        return chart_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/reading", response_model=ReadingResponse)
async def create_reading(birth_data: BirthData):
    try:
        # First generate the chart data
        chart_data = generate_birth_chart(birth_data)
        # Then use that to create a reading
        reading_content = generate_reading(birth_data, chart_data)
        return {"content": reading_content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/full-analysis", response_model=ChartAndReadingResponse)
async def create_full_analysis(birth_data: BirthData):
    try:
        chart_data = generate_birth_chart(birth_data)
        reading_content = generate_reading(birth_data, chart_data)
        return {
            "chart": chart_data,
            "reading": {"content": reading_content}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "False").lower() == "true"
    )
