# Stellar Insights Astrology App

A modern astrology web app that generates detailed birth charts and personalized readings using Swiss Ephemeris and GPT-4o.

## Features

- Generate detailed astrological birth charts with accurate planetary positions
- Calculate house placements, aspects, and retrograde status
- Visualize birth charts with interactive SVG rendering
- Provide AI-powered personalized readings using GPT-4o
- Modern, responsive UI built with Next.js and shadcn/ui
- Save and share your birth chart readings

## Technologies

- **Backend**: Python with FastAPI and Swiss Ephemeris (via Immanuel)
- **AI**: OpenAI GPT-4o for generating personalized readings
- **Frontend**: Next.js with App Router, React, and shadcn/ui
- **Data Visualization**: Custom SVG charts with React
- **Styling**: TailwindCSS for responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- OpenAI API key (for GPT-4o access)

### Installation

#### Clone the repository

```bash
git clone https://github.com/glittercowboy/stellar-insights-astrology-app.git
cd stellar-insights-astrology-app
```

#### Setup the Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local to set your API URL if needed
```

#### Setup the Backend

```bash
cd backend
# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### Running the Application

#### Start the Backend

```bash
cd backend
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000.

#### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:3000.

### Using Docker Compose

You can also use Docker to run both the frontend and backend with a single command:

```bash
docker-compose up
```

## Project Structure

- `/frontend` - Next.js frontend application
  - `/src/app` - Next.js App Router pages
  - `/src/components` - React components
  - `/src/lib` - Utility functions and API service
- `/backend` - FastAPI backend application
  - `/app` - Application modules
  - `main.py` - FastAPI application entry point

## API Endpoints

- `POST /api/chart` - Generate a birth chart
- `POST /api/reading` - Generate an astrological reading
- `POST /api/full-analysis` - Generate both chart and reading

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Swiss Ephemeris](https://www.astro.com/swisseph/) for accurate astronomical calculations
- [Immanuel](https://github.com/theriftlab/immanuel-python) for the Python implementation of Swiss Ephemeris
- [OpenAI](https://openai.com/) for GPT-4o
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
