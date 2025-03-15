// Mock data for development and testing

import { Planet, Aspect } from "@/lib/api";

// Mock planets
export const MOCK_PLANETS: Planet[] = [
  { name: "Sun", sign: "Aries", degrees: 15.5, house: 10, retrograde: false },
  { name: "Moon", sign: "Cancer", degrees: 8.2, house: 1, retrograde: false },
  { name: "Mercury", sign: "Pisces", degrees: 28.7, house: 9, retrograde: true },
  { name: "Venus", sign: "Taurus", degrees: 2.3, house: 11, retrograde: false },
  { name: "Mars", sign: "Capricorn", degrees: 20.1, house: 7, retrograde: false },
  { name: "Jupiter", sign: "Sagittarius", degrees: 10.8, house: 6, retrograde: false },
  { name: "Saturn", sign: "Libra", degrees: 5.4, house: 4, retrograde: true },
  { name: "Uranus", sign: "Aquarius", degrees: 22.9, house: 8, retrograde: false },
  { name: "Neptune", sign: "Scorpio", degrees: 18.6, house: 5, retrograde: false },
  { name: "Pluto", sign: "Virgo", degrees: 12.3, house: 3, retrograde: false },
];

// Mock aspects
export const MOCK_ASPECTS: Aspect[] = [
  { planet1: "Sun", planet2: "Moon", aspect: "Trine", orb: 1.2 },
  { planet1: "Sun", planet2: "Mercury", aspect: "Square", orb: -2.5 },
  { planet1: "Moon", planet2: "Venus", aspect: "Sextile", orb: 0.8 },
  { planet1: "Mars", planet2: "Saturn", aspect: "Opposition", orb: 3.1 },
  { planet1: "Jupiter", planet2: "Uranus", aspect: "Conjunction", orb: -0.5 },
  { planet1: "Venus", planet2: "Neptune", aspect: "Trine", orb: 1.7 },
  { planet1: "Mercury", planet2: "Pluto", aspect: "Square", orb: -2.9 },
  { planet1: "Moon", planet2: "Saturn", aspect: "Opposition", orb: 2.3 },
];

// Mock reading
export const MOCK_READING = `
# Astrological Reading for [Name]

## Sun in Aries (10th House)
Your Sun in Aries in the 10th house suggests a natural leadership quality and a strong desire for professional achievement. You have a pioneering spirit when it comes to your career and public reputation. This placement gives you courage, initiative, and a competitive edge in your professional endeavors.

## Moon in Cancer (1st House)
With your Moon in Cancer in the 1st house, your emotional nature is very apparent to others. You likely come across as nurturing, sensitive, and protective. This placement suggests strong intuitive abilities and a deep connection to your feelings. Your emotional well-being is closely tied to your sense of security and home.

## Mercury in Pisces (9th House - Retrograde)
Mercury retrograde in Pisces in the 9th house gives you a contemplative and intuitive mind. Your thinking process tends to be more abstract and imaginative than logical. This placement suggests a deep interest in philosophical or spiritual subjects, but you may sometimes struggle to communicate your complex thoughts clearly.

## Venus in Taurus (11th House)
Your Venus in Taurus in the 11th house indicates that you value stable and reliable friendships. You likely attract loyal friends who appreciate your grounded nature. This placement suggests you find pleasure in simple, sensual experiences and may have artistic talents that you share with your social circle.

## Key Aspects

### Sun Trine Moon
This harmonious aspect between your core identity (Sun) and emotional nature (Moon) suggests an inner balance and coherence between your conscious goals and subconscious needs. This alignment helps you feel comfortable with who you are.

### Mars Opposition Saturn
The opposition between Mars and Saturn creates a tension between your drive for action and your sense of caution or limitation. You may sometimes feel frustrated when attempting to push forward with plans but can ultimately achieve sustainable success by balancing assertiveness with patience.

### Jupiter Conjunction Uranus
This powerful aspect combines expansive Jupiter with revolutionary Uranus, suggesting sudden opportunities for growth and a progressive outlook. You likely value freedom and have an interest in humanitarian causes or unconventional philosophies.

## Overall Themes
Your chart shows a balance between fire elements (enthusiasm, action) and water elements (emotion, intuition), suggesting you can both take initiative and remain sensitive to others' needs. The presence of several retrograde planets indicates an introspective quality and a tendency to revisit past experiences for deeper understanding.

The emphasis on the angular houses (1st, 4th, 7th, 10th) in your chart suggests you may play significant roles in your immediate environment and have a strong impact on others. Your chart suggests particular potential in leadership positions that allow you to express both your pioneering spirit and your emotional intelligence.
`;
