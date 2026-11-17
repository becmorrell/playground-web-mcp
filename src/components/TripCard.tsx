import type { Trip } from "../types/trip";
import { LEVEL_LABELS } from "../lib/labels";
import { PinIcon, CalendarIcon, WavesIcon } from "./Icons";

interface TripCardProps {
  trip: Trip;
}

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "long", year: "numeric",
});

export function TripCard({ trip }: TripCardProps) {
  const price = new Intl.NumberFormat("en-GB", {
    style: "currency", currency: trip.currency, maximumFractionDigits: 0,
  }).format(trip.priceFrom);

  const levels = trip.levels.map(l => LEVEL_LABELS[l]).join(" & ");
  const start = dateFormat.format(new Date(trip.startDate));
  const end = dateFormat.format(new Date(trip.endDate));

  return (
    <li className="trip-card">
      <a className="trip-card__link" href={trip.url}>
        {trip.imageUrl && <img className="trip-card__image" src={trip.imageUrl} alt="" />}
        <div className="trip-card__shade" />

        <span className="pill trip-card__level"><WavesIcon />{levels}</span>

        <div className="trip-card__body">
          <h3 className="trip-card__title">{trip.title}</h3>
          <p className="trip-card__meta"><PinIcon />{trip.countries.join(" & ")} · {trip.region}</p>
          <p className="trip-card__meta"><CalendarIcon />Next: {start} – {end}</p>
          <p className="trip-card__price">{price}</p>
        </div>
      </a>
    </li>
  );
}