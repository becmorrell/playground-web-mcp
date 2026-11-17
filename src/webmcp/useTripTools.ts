import { useEffect } from "react";
import { filterTrips } from "../lib/filterTrips";
import {
  REGIONS, TRIP_TYPES, LEVELS,
  type Trip, type TripFilters,
} from "../types/trip";

export function useTripTools(
  trips: Trip[],
  setFilters: (filters: TripFilters) => void
) {
  useEffect(() => {
    // 1. Browser doesn't support WebMCP? Do nothing; the page still works for humans.
    if (!document.modelContext) return;

    // 2. Something we can use to unregister the tool later
    const controller = new AbortController();

    // 3. Describe the tool to the browser
    document.modelContext.registerTool(
      {
        name: "search_trips",
        description:
          "Search SailTies sailing trips by region, trip type and experience level. " +
          "Use when the user wants to find or browse sailing trips. " +
          "Updates the filters and trips shown on the page.",
        inputSchema: {
          type: "object",
          properties: {
            region: {
              type: "string",
              enum: [...REGIONS],
              description: "Sailing region",
            },
            type: {
              type: "string",
              enum: [...TRIP_TYPES],
              description: "Kind of trip: course, expedition, holiday or race",
            },
            level: {
              type: "string",
              enum: LEVELS.filter(l => l !== "any"),
              description: "The sailor's own experience level",
            },
          },
        },
        annotations: { readOnlyHint: true },

        // 4. What happens when the agent calls it
        execute: async (args) => {
          const filters = args as TripFilters;

          setFilters(filters);                       // update the page
          const results = filterTrips(trips, filters); // same logic as the dropdowns

          if (results.length === 0) {
            return "No trips match those filters. Try removing one.";
          }

          return JSON.stringify(
            results.map(t => ({
              id: t.id,
              title: t.title,
              countries: t.countries,
              startDate: t.startDate,
              priceFrom: t.priceFrom,
              currency: t.currency,
            }))
          );
        },
      },
      { signal: controller.signal }
    )
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });

    // 5. Cleanup: unregister when the component unmounts
    return () => controller.abort();
  }, [trips, setFilters]);
}