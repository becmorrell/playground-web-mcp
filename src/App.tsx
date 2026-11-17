import { useState } from "react";
import tripsData from "./data/trips.json";
import { REGIONS, TRIP_TYPES, LEVELS, type Trip, type TripFilters, type Region, type TripType, type Level } from "./types/trip";
import { filterTrips } from "./lib/filterTrips";
import { TYPE_LABELS, LEVEL_LABELS } from "./lib/labels";
import { useTripTools } from "./webmcp/useTripTools";
import { TripCard } from "./components/TripCard";
import { PinIcon, WavesIcon, CompassIcon } from "./components/Icons";

const trips = tripsData as Trip[];

function App() {
  const [filters, setFilters] = useState<TripFilters>({});
  useTripTools(trips, setFilters);

  const visibleTrips = filterTrips(trips, filters);
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <header className="hero">
        <p className="hero__eyebrow">Sailing trips & holidays · Prototype</p>
        <h1 className="hero__title">Find your next sailing trip</h1>
        <p className="hero__intro">
          Filter by hand, or let an AI agent do it through WebMCP. Both drive the same filters.
        </p>

        <div className="filters">
          <label className="filter">
            <span className="filter__icon"><PinIcon /></span>
            <span className="filter__text">
              <span className="filter__label">Location</span>
              <select
                className="filter__select"
                value={filters.region ?? ""}
                onChange={e => setFilters({ ...filters, region: (e.target.value as Region) || undefined })}
              >
                <option value="">Anywhere</option>
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </span>
          </label>

          <label className="filter">
            <span className="filter__icon"><WavesIcon /></span>
            <span className="filter__text">
              <span className="filter__label">Sailing type</span>
              <select
                className="filter__select"
                value={filters.type ?? ""}
                onChange={e => setFilters({ ...filters, type: (e.target.value as TripType) || undefined })}
              >
                <option value="">Any type</option>
                {TRIP_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
            </span>
          </label>

          <label className="filter">
            <span className="filter__icon"><CompassIcon /></span>
            <span className="filter__text">
              <span className="filter__label">Experience</span>
              <select
                className="filter__select"
                value={filters.level ?? ""}
                onChange={e => setFilters({ ...filters, level: (e.target.value as Level) || undefined })}
              >
                <option value="">Any level</option>
                {LEVELS.filter(l => l !== "any").map(l => (
                  <option key={l} value={l}>{LEVEL_LABELS[l]}</option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </header>

      <main className="results">
        <div className="results__head">
          <div>
            <h2 className="results__title">Trips with dates</h2>
            <p className="results__count">{visibleTrips.length} of {trips.length} trips</p>
          </div>
          <button className="btn" onClick={() => setFilters({})} disabled={!hasFilters}>
            Clear filters
          </button>
        </div>

        {visibleTrips.length === 0 ? (
          <p className="empty">No trips match these filters.</p>
        ) : (
          <ul className="trip-grid">
            {visibleTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </ul>
        )}
      </main>
    </>
  );
}

export default App;