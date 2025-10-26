openStreetURL = `https://nominatim.openstreetmap.org/search?country=ro&format=json`
openSkyURL =`https://opensky-network.org/api/states/all`

async function getObjectFromURL(url) {
    const response = await fetch(url);
    const text = await response.text();
    return JSON.parse(text);
}

async function getRoBoundaries() {
    const response = await getObjectFromURL(openStreetURL);
    const boundaries = {
        minLatitude: response[0].boundingbox[0],
        maxLatitude: response[0].boundingbox[1],
        minLongitude: response[0].boundingbox[2],
        maxLongitude: response[0].boundingbox[3]
    }
    return boundaries;
}

async function getRoAirplanes() {
    const response = await getObjectFromURL(openSkyURL);
    const boundaries = await getRoBoundaries();
    const planes = response.states.filter((e) =>
        e[6] > boundaries.minLatitude &&
        e[6] < boundaries.maxLatitude &&
        e[5] > boundaries.minLongitude &&
        e[5] < boundaries.maxLongitude
    );
    console.log("Planes over Romania (Code - Origin):")
    planes.forEach(element => {
        console.log(`${element[1] === '' ? '[REDACTED]' : element[1]} - ${element[2]}`)
    });
}

getRoAirplanes();