# Weather Dashboard

A React-based weather application that displays current weather for cities worldwide using the Weatherstack API.

## Features

- **Current weather** – Temperature, feels-like, humidity, wind, pressure, UV index, visibility
- **Multiple cities** – Dropdown with 80+ cities including major cities from Karnataka & Kerala (India), plus metros worldwide
- **Custom city search** – Enter any city name not in the list via "Other (type below)"
- **Unit toggle** – Switch between Metric (°C) and Imperial (°F)
- **Weather icons** – Visual weather condition icons from Weatherstack

## Tech Stack

- **React** – UI framework
- **Vite** – Build tool and dev server
- **Axios** – HTTP client for API requests
- **Weatherstack API** – Weather data (Current Weather endpoint)

## Prerequisites

- **Node.js** (LTS) – [Download](https://nodejs.org/)
- npm (included with Node.js)

Check installation:

```bash
node -v
npm -v
```

## Installation

1. Clone or navigate to the project folder:

```bash
cd weather-app
```

2. Install dependencies:

```bash
npm install
```

## Running the App

**Development mode** (with hot reload):

```bash
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

**Production build**:

```bash
npm run build
npm run preview
```

## API Key Setup

The app uses the [Weatherstack API](https://weatherstack.com/). A default API key is included for the free plan.

**Optional:** Use your own key via environment variable:

1. Create a `.env` file in the project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

2. Restart the dev server after changing `.env`.

> **Note:** The free Weatherstack plan supports only **current weather**. Forecast and historical data require a paid subscription.

## Project Structure

```
weather-app/
├── index.html
├── package.json
├── vite.config.mjs
├── README.md
└── src/
    ├── main.jsx        # App entry point
    ├── App.jsx         # Main UI and logic
    ├── api.js          # Weatherstack API client
    ├── cities.js       # List of cities for dropdown
    └── styles.css      # Global styles
```

## Available Scripts

| Script      | Description                    |
|-------------|--------------------------------|
| `npm run dev`    | Start development server   |
| `npm run build`  | Build for production      |
| `npm run preview`| Preview production build  |

## License

ISC
