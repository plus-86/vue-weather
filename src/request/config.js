const KEY = 'key=8abb93c74c794bb98ed96ed03ed45a11'
const BaseURL = 'https://devapi.qweather.com/v7/'
const URLDirectory = {
  weatherURL: BaseURL + 'weather/',

  geoInfoURL: 'https://geoapi.qweather.com/v2/'
}

export const Domain = {
  locationURL: URLDirectory.geoInfoURL + 'city/lookup?' + KEY + '&location=',
  realTimeWeatherURL: URLDirectory.weatherURL + 'now?' + KEY + '&location=',
  hourlyWeatherURL: URLDirectory.weatherURL + '24h?' + KEY + '&location=',
  daylyWeatherURL: URLDirectory.weatherURL + '10d?' + KEY + '&location='
}
