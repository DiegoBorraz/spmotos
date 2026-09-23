/** Av. Domingos de Almeida, 3364 — Pelotas/RS (pin Google Maps / SP Motos). */
export const STORE_LAT = -31.75154;
export const STORE_LNG = -52.300861;

/** Link oficial da loja no Google Maps. */
export const STORE_GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/FDe8QSAfisVZc5W86";

const OSM_BBOX_DELTA = 0.012;

interface GeoPoint {
  lat: number;
  lng: number;
}

const formatCoord = (value: number): string => value.toFixed(7);

export const buildOsmEmbedUrl = (): string => {
  const west = STORE_LNG - OSM_BBOX_DELTA;
  const south = STORE_LAT - OSM_BBOX_DELTA;
  const east = STORE_LNG + OSM_BBOX_DELTA;
  const north = STORE_LAT + OSM_BBOX_DELTA;
  const marker = `${formatCoord(STORE_LAT)}%2C${formatCoord(STORE_LNG)}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${marker}`;
};

export const buildOsmFullMapUrl = (): string =>
  `https://www.openstreetmap.org/?mlat=${formatCoord(STORE_LAT)}&mlon=${formatCoord(STORE_LNG)}#map=17/${formatCoord(STORE_LAT)}/${formatCoord(STORE_LNG)}`;

export const buildGoogleMapsPlaceUrl = (): string => STORE_GOOGLE_MAPS_URL;

export const buildGoogleMapsDirectionsUrl = (origin?: GeoPoint): string => {
  const destination = `${formatCoord(STORE_LAT)},${formatCoord(STORE_LNG)}`;
  const base = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  if (origin === undefined) {
    return base;
  }
  const originParam = `${formatCoord(origin.lat)},${formatCoord(origin.lng)}`;
  return `${base}&origin=${encodeURIComponent(originParam)}`;
};

export const buildWazeNavigateUrl = (): string =>
  `https://waze.com/ul?ll=${formatCoord(STORE_LAT)}%2C${formatCoord(STORE_LNG)}&navigate=yes`;
