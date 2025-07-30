let width, height;
let svg, projection, path, zoom;
let selectedCountry = null;
let worldData = null;

function updateDimensions() {
    const mapContainer = document.querySelector('.map-container');
    const rect = mapContainer.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
}

function initializeMap() {
    updateDimensions();
    
    svg = d3.select("#map")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const scale = Math.min(width, height) * 0.3;
    projection = d3.geoNaturalEarth1()
        .scale(scale)
        .translate([width / 2, height / 2]);

    path = d3.geoPath().projection(projection);

    zoom = d3.zoom()
        .scaleExtent([0.5, 8])
        .on("zoom", (event) => {
            svg.selectAll("path")
                .attr("transform", event.transform);
        });

    svg.call(zoom);
}

const countryInfo = {
    "Afghanistan": {
        "randomForest": "4.66",
        "neuralNetwork": "4.48",
        "actualFR": "4.43",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Albania": {
        "randomForest": "1.68",
        "neuralNetwork": "1.54",
        "actualFR": "1.55",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Algeria": {
        "randomForest": "2.49",
        "neuralNetwork": "2.67",
        "actualFR": "2.94",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Angola": {
        "randomForest": "5.09",
        "neuralNetwork": "4.81",
        "actualFR": "5.7",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Argentina": {
        "randomForest": "1.97",
        "neuralNetwork": "2.02",
        "actualFR": "2.15",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Armenia": {
        "randomForest": "2.12",
        "neuralNetwork": "1.82",
        "actualFR": "1.65",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Australia": {
        "randomForest": "1.81",
        "neuralNetwork": "1.7",
        "actualFR": "1.73",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Austria": {
        "randomForest": "1.61",
        "neuralNetwork": "1.62",
        "actualFR": "1.52",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Azerbaijan": {
        "randomForest": "1.81",
        "neuralNetwork": "1.79",
        "actualFR": "1.69",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Bahamas": {
        "randomForest": "1.87",
        "neuralNetwork": "1.84",
        "actualFR": "1.44",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Bahrain": {
        "randomForest": "1.89",
        "neuralNetwork": "1.66",
        "actualFR": "1.65",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Bangladesh": {
        "randomForest": "2.18",
        "neuralNetwork": "2.13",
        "actualFR": "2.07",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Belarus": {
        "randomForest": "1.5",
        "neuralNetwork": "1.62",
        "actualFR": "1.45",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Belgium": {
        "randomForest": "1.78",
        "neuralNetwork": "1.7",
        "actualFR": "1.76",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Belize": {
        "randomForest": "2.27",
        "neuralNetwork": "1.71",
        "actualFR": "2.05",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Benin": {
        "randomForest": "5.05",
        "neuralNetwork": "4.52",
        "actualFR": "5.34",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Bhutan": {
        "randomForest": "1.9",
        "neuralNetwork": "2.01",
        "actualFR": "1.76",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Bolivia": {
        "randomForest": "2.25",
        "neuralNetwork": "2.27",
        "actualFR": "2.2",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Bosnia and Herzegovina": {
        "randomForest": "1.49",
        "neuralNetwork": "1.6",
        "actualFR": "1.38",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Brazil": {
        "randomForest": "1.81",
        "neuralNetwork": "1.51",
        "actualFR": "1.74",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Bulgaria": {
        "randomForest": "1.62",
        "neuralNetwork": "1.56",
        "actualFR": "1.51",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Burkina Faso": {
        "randomForest": "4.36",
        "neuralNetwork": "4.4",
        "actualFR": "4.02",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Burundi": {
        "randomForest": "4.75",
        "neuralNetwork": "4.64",
        "actualFR": "4.9",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Cambodia": {
        "randomForest": "2.38",
        "neuralNetwork": "2.27",
        "actualFR": "2.17",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Cameroon": {
        "randomForest": "4.01",
        "neuralNetwork": "4.35",
        "actualFR": "4.44",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Canada": {
        "randomForest": "1.63",
        "neuralNetwork": "1.44",
        "actualFR": "1.58",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Central African Republic": {
        "randomForest": "5.61",
        "neuralNetwork": "5.66",
        "actualFR": "3.94",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Chad": {
        "randomForest": "5.68",
        "neuralNetwork": "6.06",
        "actualFR": "5.24",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Chile": {
        "randomForest": "1.62",
        "neuralNetwork": "1.48",
        "actualFR": "1.75",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "China": {
        "randomForest": "1.48",
        "neuralNetwork": "1.32",
        "actualFR": "1.55",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Colombia": {
        "randomForest": "1.84",
        "neuralNetwork": "1.79",
        "actualFR": "1.94",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Comoros": {
        "randomForest": "3.26",
        "neuralNetwork": "3.34",
        "actualFR": "2.61",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Costa Rica": {
        "randomForest": "1.83",
        "neuralNetwork": "1.42",
        "actualFR": "1.43",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Croatia": {
        "randomForest": "1.56",
        "neuralNetwork": "1.59",
        "actualFR": "1.46",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Cuba": {
        "randomForest": "1.7",
        "neuralNetwork": "1.63",
        "actualFR": "1.71",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Cyprus": {
        "randomForest": "1.52",
        "neuralNetwork": "1.56",
        "actualFR": "1.49",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Denmark": {
        "randomForest": "1.8",
        "neuralNetwork": "1.83",
        "actualFR": "1.77",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Dominica": {
        "randomForest": "1.99",
        "neuralNetwork": "1.57",
        "actualFR": "2.01",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Dominican Republic": {
        "randomForest": "2.1",
        "neuralNetwork": "1.9",
        "actualFR": "2.15",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Ecuador": {
        "randomForest": "1.83",
        "neuralNetwork": "1.71",
        "actualFR": "2.21",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Egypt": {
        "randomForest": "2.56",
        "neuralNetwork": "2.14",
        "actualFR": "2.65",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "El Salvador": {
        "randomForest": "2",
        "neuralNetwork": "1.82",
        "actualFR": "2.02",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Equatorial Guinea": {
        "randomForest": "3.45",
        "neuralNetwork": "3.7",
        "actualFR": "4.12",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Eritrea": {
        "randomForest": "3.47",
        "neuralNetwork": "3.49",
        "actualFR": "3.43",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Estonia": {
        "randomForest": "1.56",
        "neuralNetwork": "1.42",
        "actualFR": "1.62",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Ethiopia": {
        "randomForest": "3.1",
        "neuralNetwork": "3.76",
        "actualFR": "3.84",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Fiji": {
        "randomForest": "2.27",
        "neuralNetwork": "1.71",
        "actualFR": "2.21",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Finland": {
        "randomForest": "1.56",
        "neuralNetwork": "2.04",
        "actualFR": "1.74",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "France": {
        "randomForest": "1.89",
        "neuralNetwork": "1.66",
        "actualFR": "1.9",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Gabon": {
        "randomForest": "3.27",
        "neuralNetwork": "3.02",
        "actualFR": "3.21",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Gambia": {
        "randomForest": "3.89",
        "neuralNetwork": "3.69",
        "actualFR": "3.52",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Georgia": {
        "randomForest": "1.77",
        "neuralNetwork": "1.77",
        "actualFR": "1.95",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Germany": {
        "randomForest": "1.64",
        "neuralNetwork": "1.7",
        "actualFR": "1.58",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Ghana": {
        "randomForest": "3.46",
        "neuralNetwork": "3.2",
        "actualFR": "3.56",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Greece": {
        "randomForest": "1.42",
        "neuralNetwork": "1.61",
        "actualFR": "1.41",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Guatemala": {
        "randomForest": "2.34",
        "neuralNetwork": "2.01",
        "actualFR": "2.52",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Guinea": {
        "randomForest": "4.43",
        "neuralNetwork": "4.54",
        "actualFR": "4.78",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Guyana": {
        "randomForest": "2.17",
        "neuralNetwork": "1.58",
        "actualFR": "2.05",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Haiti": {
        "randomForest": "2.73",
        "neuralNetwork": "2.92",
        "actualFR": "2.44",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Honduras": {
        "randomForest": "2.15",
        "neuralNetwork": "2.32",
        "actualFR": "2.33",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Hungary": {
        "randomForest": "1.54",
        "neuralNetwork": "1.53",
        "actualFR": "1.6",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Iceland": {
        "randomForest": "1.87",
        "neuralNetwork": "1.89",
        "actualFR": "1.94",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "India": {
        "randomForest": "2.16",
        "neuralNetwork": "1.87",
        "actualFR": "2.03",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Indonesia": {
        "randomForest": "2.16",
        "neuralNetwork": "2.03",
        "actualFR": "1.96",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Iran": {
        "randomForest": "1.8",
        "neuralNetwork": "1.67",
        "actualFR": "1.91",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Iraq": {
        "randomForest": "2.91",
        "neuralNetwork": "2.7",
        "actualFR": "3.1",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Ireland": {
        "randomForest": "1.84",
        "neuralNetwork": "2.02",
        "actualFR": "1.72",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Israel": {
        "randomForest": "2.47",
        "neuralNetwork": "2.18",
        "actualFR": "2.92",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Italy": {
        "randomForest": "1.4",
        "neuralNetwork": "1.66",
        "actualFR": "1.26",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Jamaica": {
        "randomForest": "1.97",
        "neuralNetwork": "1.76",
        "actualFR": "2.05",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Japan": {
        "randomForest": "1.34",
        "neuralNetwork": "1.54",
        "actualFR": "1.4",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Jordan": {
        "randomForest": "2.41",
        "neuralNetwork": "2.17",
        "actualFR": "2.87",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Kazakhstan": {
        "randomForest": "2.31",
        "neuralNetwork": "2.36",
        "actualFR": "2.58",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Kenya": {
        "randomForest": "3.14",
        "neuralNetwork": "3.15",
        "actualFR": "3.16",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Kiribati": {
        "randomForest": "2.63",
        "neuralNetwork": "3.09",
        "actualFR": "2.15",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Kuwait": {
        "randomForest": "1.93",
        "neuralNetwork": "2.23",
        "actualFR": "2.21",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Kyrgyzstan": {
        "randomForest": "2.24",
        "neuralNetwork": "1.55",
        "actualFR": "2.45",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Laos": {
        "randomForest": "2.47",
        "neuralNetwork": "2.49",
        "actualFR": "2.24",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Latvia": {
        "randomForest": "1.58",
        "neuralNetwork": "1.47",
        "actualFR": "1.55",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Lebanon": {
        "randomForest": "2.05",
        "neuralNetwork": "2.27",
        "actualFR": "1.71",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Lesotho": {
        "randomForest": "2.71",
        "neuralNetwork": "3.26",
        "actualFR": "2.85",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Liberia": {
        "randomForest": "3.87",
        "neuralNetwork": "4.15",
        "actualFR": "3.93",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Lithuania": {
        "randomForest": "1.52",
        "neuralNetwork": "1.38",
        "actualFR": "1.62",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Luxembourg": {
        "randomForest": "1.6",
        "neuralNetwork": "2.38",
        "actualFR": "1.63",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Madagascar": {
        "randomForest": "3.8",
        "neuralNetwork": "4.34",
        "actualFR": "3.47",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Malawi": {
        "randomForest": "3.46",
        "neuralNetwork": "3.57",
        "actualFR": "3.19",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Malaysia": {
        "randomForest": "1.7",
        "neuralNetwork": "1.58",
        "actualFR": "1.73",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Maldives": {
        "randomForest": "1.7",
        "neuralNetwork": "1.59",
        "actualFR": "1.7",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Mali": {
        "randomForest": "5.57",
        "neuralNetwork": "5.54",
        "actualFR": "5.35",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Malta": {
        "randomForest": "1.54",
        "neuralNetwork": "1.41",
        "actualFR": "1.51",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Mauritania": {
        "randomForest": "4",
        "neuralNetwork": "3.98",
        "actualFR": "3.4",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Mexico": {
        "randomForest": "2.01",
        "neuralNetwork": "1.63",
        "actualFR": "1.79",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Moldova": {
        "randomForest": "1.73",
        "neuralNetwork": "1.75",
        "actualFR": "1.26",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Mongolia": {
        "randomForest": "2.13",
        "neuralNetwork": "2.41",
        "actualFR": "1.87",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Montenegro": {
        "randomForest": "1.68",
        "neuralNetwork": "1.65",
        "actualFR": "1.8",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Morocco": {
        "randomForest": "2.29",
        "neuralNetwork": "1.81",
        "actualFR": "2.25",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Mozambique": {
        "randomForest": "4.72",
        "neuralNetwork": "4.61",
        "actualFR": "4.66",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Myanmar": {
        "randomForest": "2.35",
        "neuralNetwork": "2.27",
        "actualFR": "1.97",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Namibia": {
        "randomForest": "2.95",
        "neuralNetwork": "2.98",
        "actualFR": "2.89",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Nepal": {
        "randomForest": "2.08",
        "neuralNetwork": "2.07",
        "actualFR": "1.85",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Netherlands": {
        "randomForest": "1.67",
        "neuralNetwork": "1.74",
        "actualFR": "1.61",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "New Zealand": {
        "randomForest": "1.75",
        "neuralNetwork": "1.62",
        "actualFR": "1.85",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Nicaragua": {
        "randomForest": "2.05",
        "neuralNetwork": "2.08",
        "actualFR": "1.83",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Niger": {
        "randomForest": "6.38",
        "neuralNetwork": "6.34",
        "actualFR": "6.64",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Nigeria": {
        "randomForest": "4.75",
        "neuralNetwork": "4.82",
        "actualFR": "4.52",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "North Macedonia": {
        "randomForest": "1.52",
        "neuralNetwork": "1.59",
        "actualFR": "1.53",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Norway": {
        "randomForest": "1.75",
        "neuralNetwork": "1.92",
        "actualFR": "1.57",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Oman": {
        "randomForest": "2.51",
        "neuralNetwork": "1.8",
        "actualFR": "2.64",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Pakistan": {
        "randomForest": "3.55",
        "neuralNetwork": "3.48",
        "actualFR": "3.32",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Palau": {
        "randomForest": "2.22",
        "neuralNetwork": "1.48",
        "actualFR": "1.7",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Panama": {
        "randomForest": "2.33",
        "neuralNetwork": "1.59",
        "actualFR": "2.35",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Papua New Guinea": {
        "randomForest": "3.38",
        "neuralNetwork": "2.86",
        "actualFR": "3.79",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Paraguay": {
        "randomForest": "2.02",
        "neuralNetwork": "1.93",
        "actualFR": "1.88",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Peru": {
        "randomForest": "2.12",
        "neuralNetwork": "1.99",
        "actualFR": "2.15",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Philippines": {
        "randomForest": "2.53",
        "neuralNetwork": "1.99",
        "actualFR": "2.75",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Poland": {
        "randomForest": "1.52",
        "neuralNetwork": "1.41",
        "actualFR": "1.32",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Portugal": {
        "randomForest": "1.49",
        "neuralNetwork": "1.47",
        "actualFR": "1.45",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Qatar": {
        "randomForest": "1.84",
        "neuralNetwork": "1.78",
        "actualFR": "1.9",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Romania": {
        "randomForest": "1.66",
        "neuralNetwork": "1.54",
        "actualFR": "1.63",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Russia": {
        "randomForest": "1.59",
        "neuralNetwork": "1.47",
        "actualFR": "1.52",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Rwanda": {
        "randomForest": "3.4",
        "neuralNetwork": "3.4",
        "actualFR": "3.14",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "San Marino": {
        "randomForest": "1.45",
        "neuralNetwork": "1.68",
        "actualFR": "1.54",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Sao Tome and Principe": {
        "randomForest": "3.37",
        "neuralNetwork": "3.17",
        "actualFR": "3.31",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Senegal": {
        "randomForest": "3.8",
        "neuralNetwork": "3.43",
        "actualFR": "4.06",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Serbia": {
        "randomForest": "1.5",
        "neuralNetwork": "1.69",
        "actualFR": "1.46",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Sierra Leone": {
        "randomForest": "3.74",
        "neuralNetwork": "4.44",
        "actualFR": "3.61",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Singapore": {
        "randomForest": "1.42",
        "neuralNetwork": "1.8",
        "actualFR": "1.17",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Slovakia": {
        "randomForest": "1.62",
        "neuralNetwork": "1.41",
        "actualFR": "1.6",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Slovenia": {
        "randomForest": "1.63",
        "neuralNetwork": "1.59",
        "actualFR": "1.6",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "South Africa": {
        "randomForest": "2.18",
        "neuralNetwork": "2.12",
        "actualFR": "2.27",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "South Korea": {
        "randomForest": "1.33",
        "neuralNetwork": "1.43",
        "actualFR": "1.12",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "South Sudan": {
        "randomForest": "3.63",
        "neuralNetwork": "4.34",
        "actualFR": "5.09",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Spain": {
        "randomForest": "1.33",
        "neuralNetwork": "1.49",
        "actualFR": "1.3",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Sri Lanka": {
        "randomForest": "2.13",
        "neuralNetwork": "1.77",
        "actualFR": "2.13",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Sudan": {
        "randomForest": "4.38",
        "neuralNetwork": "3.87",
        "actualFR": "4.47",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Sweden": {
        "randomForest": "1.7",
        "neuralNetwork": "1.73",
        "actualFR": "1.67",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Switzerland": {
        "randomForest": "1.59",
        "neuralNetwork": "1.99",
        "actualFR": "1.59",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Syria": {
        "randomForest": "2.56",
        "neuralNetwork": "2.53",
        "actualFR": "2.69",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Tajikistan": {
        "randomForest": "2.52",
        "neuralNetwork": "2.75",
        "actualFR": "3.56",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Tanzania": {
        "randomForest": "4.52",
        "neuralNetwork": "4.31",
        "actualFR": "4.27",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Thailand": {
        "randomForest": "1.58",
        "neuralNetwork": "1.49",
        "actualFR": "1.54",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Timor-Leste": {
        "randomForest": "2.87",
        "neuralNetwork": "2.7",
        "actualFR": "3.98",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Togo": {
        "randomForest": "4.25",
        "neuralNetwork": "3.83",
        "actualFR": "4.13",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Tonga": {
        "randomForest": "2.48",
        "neuralNetwork": "2.6",
        "actualFR": "2.65",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Turkey": {
        "randomForest": "1.95",
        "neuralNetwork": "1.39",
        "actualFR": "1.9",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Turkmenistan": {
        "randomForest": "2.21",
        "neuralNetwork": "2.15",
        "actualFR": "2.02",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Uganda": {
        "randomForest": "4.29",
        "neuralNetwork": "4.1",
        "actualFR": "5.17",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Ukraine": {
        "randomForest": "1.58",
        "neuralNetwork": "1.63",
        "actualFR": "1.22",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "United Arab Emirates": {
        "randomForest": "1.58",
        "neuralNetwork": "1.52",
        "actualFR": "1.61",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "United Kingdom": {
        "randomForest": "1.77",
        "neuralNetwork": "1.69",
        "actualFR": "1.63",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "United States": {
        "randomForest": "1.81",
        "neuralNetwork": "1.81",
        "actualFR": "1.84",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Uruguay": {
        "randomForest": "1.71",
        "neuralNetwork": "1.35",
        "actualFR": "1.75",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Uzbekistan": {
        "randomForest": "2.38",
        "neuralNetwork": "2.95",
        "actualFR": "2.76",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Venezuela": {
        "randomForest": "2.39",
        "neuralNetwork": "1.56",
        "actualFR": "2.18",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    },
    "Vietnam": {
        "randomForest": "2.25",
        "neuralNetwork": "1.9",
        "actualFR": "2.03",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Yemen": {
        "randomForest": "4.56",
        "neuralNetwork": "4.14",
        "actualFR": "2.82",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Zambia": {
        "randomForest": "3.2",
        "neuralNetwork": "4.1",
        "actualFR": "4.42",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Neural Network"
    },
    "Zimbabwe": {
        "randomForest": "3.61",
        "neuralNetwork": "3.67",
        "actualFR": "3.47",
        "description": "This project uses the factors HDI, female literacy, GDP per capita, child mortality, and mean age at first birth. These models are trained on data from 2020-2023 to predict the fertility rate for the year 2024.",
        "betterModel": "Random Forest"
    }
};

const dataSources = [
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
    'https://raw.githubusercontent.com/topojson/world-atlas/master/countries-110m.json',
    'https://unpkg.com/world-atlas@2/countries-110m.json'
];

async function loadWorldMap() {
    let lastError = null;
    
    for (let i = 0; i < dataSources.length; i++) {
        try {
            console.log(`Trying data source ${i + 1}:`, dataSources[i]);
            const response = await fetch(dataSources[i]);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const world = await response.json();
            
            const countries = topojson.feature(world, world.objects.countries);
            worldData = countries;
            
            document.getElementById('loading').style.display = 'none';
            document.querySelector('.reset-btn').style.display = 'block';
            document.querySelector('.zoom-controls').style.display = 'flex';
            
            drawMap();
            
            document.getElementById('country-info').innerHTML = `
                <h2>🌍 Interactive World Map</h2>
                <div class="welcome-message">
                    <p>Click on any country to explore and learn more about it!</p>
                    <p>Use zoom controls or mouse wheel to navigate.</p>
                    <p>Drag to pan around the map.</p>
                </div>
            `;
            
            return;
            
        } catch (error) {
            console.error(`Error with data source ${i + 1}:`, error);
            lastError = error;
            continue;
        }
    }
    
    showFallbackMap();
}

function drawMap() {
    svg.selectAll("path")
        .data(worldData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country")
        .on("click", function(event, d) {
            selectCountry(d, this);
        })
        .on("mouseover", function(event, d) {
            d3.select(this).style("cursor", "pointer");
        })
        .append("title")
        .text(d => d.properties.NAME || d.properties.name || d.properties.NAME_EN || "Unknown");
}

function selectCountry(countryData, element) {
    svg.selectAll(".country").classed("selected", false);
    
    d3.select(element).classed("selected", true);
    selectedCountry = countryData;
    
    const countryName = countryData.properties.NAME || countryData.properties.name || countryData.properties.NAME_EN || "Unknown";
    const info = countryInfo[countryName] || {
        randomForest: "Information not available",
        neuralNetwork: "Information not available",
        actualFR: "Information not available",
        description: "This country is part of our interactive world map. Click on other countries to explore more!",
        betterModel: "Unknown"
    };
    
    document.getElementById('country-info').innerHTML = `
        <h2>${countryName}</h2>
        <div class="stat">Random Forest: ${info.randomForest}</div>
        <div class="stat">Neural Network: ${info.neuralNetwork}</div>
        <div class="stat">Actaul Fertility Rate: ${info.actualFR}</div>
        <div class="stat">Better Model: ${info.betterModel}</div>
        <p>${info.description}</p>
    `;
    
    zoomToCountry(countryData);
}

function zoomToCountry(countryData) {
    const bounds = path.bounds(countryData);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = Math.min(8, 0.9 / Math.max(dx / width, dy / height));
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

function resetView() {
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    
    svg.selectAll(".country").classed("selected", false);
    selectedCountry = null;
    
    document.getElementById('country-info').innerHTML = `
        <h2>🌍 Interactive World Map</h2>
        <div class="welcome-message">
            <p>Click on any country to explore and learn more about it!</p>
            <p>Use zoom controls or mouse wheel to navigate.</p>
            <p>Drag to pan around the map.</p>
        </div>
    `;
}

function zoomIn() {
    svg.transition().duration(300).call(zoom.scaleBy, 1.5);
}

function zoomOut() {
    svg.transition().duration(300).call(zoom.scaleBy, 1 / 1.5);
}

function showFallbackMap() {
    document.getElementById('loading').style.display = 'none';
    
    document.querySelector('.map-container').innerHTML = `
        <div class="fallback-message">
            <h3>⚠️ Unable to load external map data</h3>
            <p>Due to network restrictions, we cannot load the world map data from external sources.</p>
            <p><strong>Solutions:</strong></p>
            <ul style="text-align: left; margin: 20px 0;">
                <li>Download the map data locally and serve it from your own server</li>
                <li>Use a different mapping library like Leaflet with tile layers</li>
                <li>Implement a server-side proxy to fetch the data</li>
                <li>Use embedded GeoJSON data (larger file size)</li>
            </ul>
            <p>The previous simplified map version works without external dependencies.</p>
        </div>
    `;
    
    document.getElementById('country-info').innerHTML = `
        <h2>🌍 Map Loading Issue</h2>
        <div class="welcome-message">
            <p>The external map data couldn't be loaded due to network restrictions.</p>
            <p>This is common in sandboxed environments.</p>
        </div>
        <div class="stat">Alternative Solution</div>
        <p>For production use, download the TopoJSON file and serve it from your own domain, or use a mapping service like Leaflet, Mapbox, or Google Maps.</p>
    `;
}

function handleResize() {
    updateDimensions();
    
    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);
    
    const scale = Math.min(width, height) * 0.3;
    projection.scale(scale).translate([width / 2, height / 2]);
    
    svg.selectAll("path").attr("d", path);
}

window.addEventListener('load', () => {
    initializeMap();
    loadWorldMap();
});

window.addEventListener('resize', handleResize);
