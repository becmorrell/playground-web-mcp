import type { Trip, TripFilters } from '../types/trip'

export function filterTrips(trips: Trip[], filters: TripFilters): Trip[] {
  const { region, type, level } = filters 

  return trips
  .filter(t => !region || t.region === region)
  .filter(t => !type || t.type === type)
  .filter(t => !level || t.levels.includes(level) || t.levels.includes("any"))
}