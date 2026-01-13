// Sample: Weather API Client
// A simple weather service client with various intentional issues for code review

class WeatherClient {
  constructor() {
    this.apiKey = 'abc123xyz789'; // Issue: Hardcoded API key
    this.baseUrl = 'https://api.weather.example.com';
    this.cache = {}; // Simple cache
  }

  // Issue 1: Missing error handling
  async getWeather(city) {
    const url = `${this.baseUrl}/current?city=${city}&key=${this.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // Issue 2: Inefficient cache check and no cache expiry
  async getWeatherWithCache(city) {
    if (this.cache[city]) {
      return this.cache[city];
    }
    const weather = await this.getWeather(city);
    this.cache[city] = weather;
    return weather;
  }

  // Issue 3: No validation, poor error message
  convertTemperature(celsius, scale) {
    if (scale == 'F') { // Should use ===
      return (celsius * 9/5) + 32;
    } else if (scale == 'K') {
      return celsius + 273.15;
    }
    return celsius;
  }

  // Issue 4: Race condition - multiple simultaneous requests
  async getMultipleCities(cities) {
    let results = [];
    for (let city of cities) {
      const weather = await this.getWeather(city);
      results.push(weather);
    }
    return results;
  }

  // Issue 5: Memory leak - cache never cleared
  clearCache() {
    this.cache = null; // Should reset to empty object
  }

  // Issue 6: Confusing variable naming
  async gwc(c) {
    let t = await this.getWeather(c);
    let h = t.humidity;
    let temp = t.temp;
    let p = t.pressure;
    return { t: temp, h: h, p: p };
  }
}

module.exports = WeatherClient;
