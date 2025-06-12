// src/utils/useGeoapifyAutocomplete.js
import { useEffect, useState } from 'react';

const API_KEY = '0cba60ff517f4cbb9ffa6fe26b3e5540'; // Replace with your real Geoapify API key

export default function useGeoapifyAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query) return;

      try {
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${API_KEY}`
        );
        const data = await res.json();

        if (data && data.features) {
          const results = data.features.map((f) => f.properties.formatted);
          setSuggestions(results);
        }
      } catch (error) {
        console.error('Geoapify fetch error:', error);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return suggestions;
}
