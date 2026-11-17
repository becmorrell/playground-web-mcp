import type { Level, TripType } from "../types/trip";

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  any: "Open to all",
};

export const TYPE_LABELS: Record<TripType, string> = {
  course: "Sailing course",
  expedition: "Expedition",
  holiday: "Sailing holiday",
  race: "Race",
};