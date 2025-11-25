
function toDMS(deg) {
const d = Math.floor(deg);
const minFloat = (deg - d) * 60;
const m = Math.floor(minFloat);
const secFloat = (minFloat - m) * 60;
const s = secFloat.toFixed(1);
return `${d}°${m}'${s}"`;
}

const coordSpan = document.getElementById("user-coords");

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
    (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const latDMS = toDMS(Math.abs(lat)) + (lat >= 0 ? "N" : "S");
    const lonDMS = toDMS(Math.abs(lon)) + (lon >= 0 ? "E" : "W");

    coordSpan.textContent = `${latDMS} ${lonDMS}`;
    },
    () => {
    coordSpan.textContent = "Localisation refusée";
    }
);
} else {
coordSpan.textContent = "Géolocalisation non supportée";
}

