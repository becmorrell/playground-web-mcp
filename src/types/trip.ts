export const REGIONS = ["Caribbean", "Europe", "Americas"] as const;
export const TRIP_TYPES = ["course", "expedition", "holiday", "race"] as const;
export const LEVELS = ["beginner", "intermeditate", "advanced", "any"] as const;

export type Region = (typeof REGIONS)[number];
export type TripType = (typeof TRIP_TYPES)[number];
export type Level = (typeof LEVELS)[number];


export interface Trip {
  id: string;
  title: string;
  summary: string;
  url: string;
  region: string;
  countries: string[];
  levels: Level[];          // was `level`
  type: TripType;
  startDate: string;
  endDate: string;
  priceFrom: number;
  currency: "GBP" | "USD" | "EUR";
  operator: string | null;  // was `string`
  imageUrl?: string;        // now optional
}

export interface TripFilters {
  region?: Region;
  type?: TripType;
  level?: Level
}