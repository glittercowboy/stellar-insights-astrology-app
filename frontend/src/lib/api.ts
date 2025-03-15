import axios from 'axios';

// Initialize axios with base URL from environment
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BirthData {
  name: string;
  birth_date: string;
  birth_time?: string;
  birth_city: string;
  birth_country: string;
  birth_lat?: number;
  birth_lng?: number;
}

export interface Planet {
  name: string;
  sign: string;
  degrees: number;
  house?: number;
  retrograde: boolean;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
}

export interface ChartData {
  planets: Planet[];
  aspects?: Aspect[];
  houses?: any[];
  chart_svg?: string;
}

export interface ReadingData {
  content: string;
}

export interface ChartAndReadingData {
  chart: ChartData;
  reading: ReadingData;
}

// API endpoints
export const astrologyApi = {
  // Get birth chart data
  generateChart: async (birthData: BirthData): Promise<ChartData> => {
    try {
      const response = await api.post('/api/chart', birthData);
      return response.data;
    } catch (error) {
      console.error('Error generating chart:', error);
      throw error;
    }
  },

  // Get astrological reading
  generateReading: async (birthData: BirthData): Promise<ReadingData> => {
    try {
      const response = await api.post('/api/reading', birthData);
      return response.data;
    } catch (error) {
      console.error('Error generating reading:', error);
      throw error;
    }
  },

  // Get both chart and reading in one request
  generateFullAnalysis: async (birthData: BirthData): Promise<ChartAndReadingData> => {
    try {
      const response = await api.post('/api/full-analysis', birthData);
      return response.data;
    } catch (error) {
      console.error('Error generating full analysis:', error);
      throw error;
    }
  },
};
