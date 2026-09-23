"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";
import { buildGoogleMapsDirectionsUrl, buildWazeNavigateUrl } from "@/lib/store-location";

type GeolocationStatus = "idle" | "loading" | "denied" | "unavailable";

const outlineButtonClassName =
  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-stone bg-surface px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-page focus-visible:outline-none sm:flex-none sm:px-6";

export const ContatoDirections: React.FC = () => {
  const [geoStatus, setGeoStatus] = useState<GeolocationStatus>("idle");

  const googleDirectionsUrl = buildGoogleMapsDirectionsUrl();
  const wazeUrl = buildWazeNavigateUrl();
  const handleRouteFromLocation = (): void => {
    if (!navigator.geolocation) {
      setGeoStatus("unavailable");
      return;
    }

    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoStatus("idle");
        const url = buildGoogleMapsDirectionsUrl({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        window.open(url, "_blank", "noopener,noreferrer");
      },
      () => {
        setGeoStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 12_000, maximumAge: 60_000 },
    );
  };

  const geoMessage =
    geoStatus === "denied"
      ? copy.contato.geolocationDenied
      : geoStatus === "unavailable"
        ? copy.contato.geolocationUnavailable
        : null;

  return (
    <section className="flex flex-col gap-3" aria-labelledby="contato-directions-heading">
      <h2 id="contato-directions-heading" className="text-lg font-bold text-foreground">
        {copy.contato.directionsHeading}
      </h2>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a href={googleDirectionsUrl} target="_blank" rel="noopener noreferrer" className={outlineButtonClassName}>
          {copy.contato.googleMapsLabel}
        </a>
        <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className={outlineButtonClassName}>
          {copy.contato.wazeLabel}
        </a>
      </div>
      <button
        type="button"
        onClick={handleRouteFromLocation}
        disabled={geoStatus === "loading"}
        className="inline-flex min-h-[44px] items-center text-left text-sm font-semibold text-moss underline-offset-2 hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline focus-visible:outline-none disabled:opacity-60"
      >
        {geoStatus === "loading" ? copy.contato.geolocationLoading : copy.contato.routeFromLocationLabel}
      </button>
      {geoMessage !== null ? (
        <p className="text-sm text-moss" role="status">
          {geoMessage}
        </p>
      ) : null}
    </section>
  );
};
