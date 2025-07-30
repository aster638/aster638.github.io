
// Map dimensions and setup
const width = 960;
const height = 500;

// Create SVG
const svg = d3.select("#map")
    .attr("width", width)
    .attr("height", height);

// Create map projection
const projection = d3.geoNaturalEarth1()
    .scale(150)
    .translate([width / 2, height / 2]);

// Create path generator
const path = d3.geoPath().projection(projection);

// Zoom behavior
const zoom = d3.zoom()
    .scaleExtent([0.5, 8])
    .on("zoom", (event) => {
        svg.selectAll("path")
            .attr("transform", event.transform);
    });

svg.call(zoom);

let selectedCountry = null;
let worldData = null;

// Country information database
const countryInfo = {
    "United States": {
        capital: "Washington, D.C.",
        population: "331 million",
        area: "9.8 million km²",
        description: "The United States is a federal republic comprising 50 states. Known for its diverse landscapes, cultural influence, and economic power.",
        continent: "North America"
    },
    "Canada": {
        capital: "Ottawa",
        population: "38 million",
        area: "10.0 million km²",
        description: "Canada is the world's second-largest country by area, known for its vast wilderness and multicultural society.",
        continent: "North America"
    },
    "Brazil": {
        capital: "Brasília",
        population: "215 million",
        area: "8.5 million km²",
        description: "Brazil is the largest country in South America, home to much of the Amazon rainforest and vibrant culture.",
        continent: "South America"
    },
    "Russia": {
        capital: "Moscow",
        population: "146 million",
        area: "17.1 million km²",
        description: "Russia is the world's largest country by land area, spanning eleven time zones from Europe to Asia.",
        continent: "Europe/Asia"
    },
    "China": {
        capital: "Beijing",
        population: "1.4 billion",
        area: "9.6 million km²",
        description: "China is the world's most populous country with over 4,000 years of history and rapid modern development.",
        continent: "Asia"
    },
    "India": {
        capital: "New Delhi",
        population: "1.4 billion",
        area: "3.3 million km²",
        description: "India is known for incredible diversity in languages, religions, cultures, and as a major technology hub.",
        continent: "Asia"
    },
    "Australia": {
        capital: "Canberra",
        population: "26 million",
        area: "7.7 million km²",
        description: "Australia is both a country and continent, known for unique wildlife, beautiful beaches, and the Outback.",
        continent: "Oceania"
    },
    "United Kingdom": {
        capital: "London",
        population: "67 million",
        area: "243,610 km²",
        description: "The UK consists of England, Scotland, Wales, and Northern Ireland. Rich in history and global influence.",
        continent: "Europe"
    },
    "France": {
        capital: "Paris",
        population: "68 million",
        area: "643,801 km²",
        description: "France is renowned for art, cuisine, fashion, and culture. Home to the Eiffel Tower and Louvre Museum.",
        continent: "Europe"
    },
    "Germany": {
        capital: "Berlin",
        population: "83 million",
        area: "357,022 km²",
        description: "Germany is Europe's economic powerhouse, known for engineering, automotive industry, and cultural heritage.",
        continent: "Europe"
    },
    "Japan": {
        capital: "Tokyo",
        population: "125 million",
        area: "377,975 km²",
        description: "Japan blends traditional and modern culture, famous for technology, anime, sushi, and cherry blossoms.",
        continent: "Asia"
    },
    "Mexico": {
        capital: "Mexico City",
        population: "129 million",
        area: "1.96 million km²",
        description: "Mexico is known for rich pre-Columbian history, vibrant culture, and delicious cuisine.",
        continent: "North America"
    },
    "Argentina": {
        capital: "Buenos Aires",
        population: "45 million",
        area: "2.78 million km²",
        description: "Argentina is famous for tango, beef, wine, and football. From Buenos Aires to Patagonia.",
        continent: "South America"
    },
    "South Africa": {
        capital: "Cape Town",
        population: "60 million",
        area: "1.22 million km²",
        description: "South Africa is known for diverse wildlife, stunning landscapes, and the legacy of Nelson Mandela.",
        continent: "Africa"
    },
    "Egypt": {
        capital: "Cairo",
        population: "104 million",
        area: "1.00 million km²",
        description: "Egypt is home to ancient civilization and the iconic pyramids of Giza along the Nile River.",
        continent: "Africa"
    }
};

// Multiple data sources to try
const dataSources = [
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json',
    'https://raw.githubusercontent.com/topojson/world-atlas/master/countries-110m.json',
    'https://unpkg.com/world-atlas@2/countries-110m.json'
];

// Load world map data with fallback sources
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
            
            // Convert TopoJSON to GeoJSON
            const countries = topojson.feature(world, world.objects.countries);
            worldData = countries;
            
            // Hide loading message
            document.getElementById('loading').style.display = 'none';
            document.querySelector('.reset-btn').style.display = 'block';
            document.querySelector('.zoom-controls').style.display = 'flex';
            
            // Draw the map
            drawMap();
            
            // Update info panel
            document.getElementById('country-info').innerHTML = `
                <h2>🌍 Interactive World Map</h2>
                <div class="welcome-message">
                    <p>Click on any country to explore and learn more about it!</p>
                    <p>Use zoom controls or mouse wheel to navigate.</p>
                    <p>Drag to pan around the map.</p>
                </div>
            `;
            
            return; // Success, exit function
            
        } catch (error) {
            console.error(`Error with data source ${i + 1}:`, error);
            lastError = error;
            continue; // Try next source
        }
    }
    
    // If all sources fail, show fallback
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
    // Remove previous selection
    svg.selectAll(".country").classed("selected", false);
    
    // Select new country
    d3.select(element).classed("selected", true);
    selectedCountry = countryData;
    
    // Get country info
    const countryName = countryData.properties.NAME || countryData.properties.name || countryData.properties.NAME_EN || "Unknown";
    const info = countryInfo[countryName] || {
        capital: "Information not available",
        population: "Information not available",
        area: "Information not available",
        description: "This country is part of our interactive world map. Click on other countries to explore more!",
        continent: "Unknown"
    };
    
    // Update info panel
    document.getElementById('country-info').innerHTML = `
        <h2>${countryName}</h2>
        <div class="stat">Capital: ${info.capital}</div>
        <div class="stat">Population: ${info.population}</div>
        <div class="stat">Area: ${info.area}</div>
        <div class="stat">Continent: ${info.continent}</div>
        <p>${info.description}</p>
    `;
    
    // Zoom to country
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
    
    // Clear selection
    svg.selectAll(".country").classed("selected", false);
    selectedCountry = null;
    
    // Reset info panel
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
    // Hide loading message
    document.getElementById('loading').style.display = 'none';
    
    // Show fallback message
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
    
    // Update info panel
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

// Initialize the map
loadWorldMap();
