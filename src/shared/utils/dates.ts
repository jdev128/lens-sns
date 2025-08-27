import type { TimePeriod } from "../types/TimePeriod";
import { ORDERED_PERIODS } from "./constants/dates";

export const getCurrentISODate = (): string => new Date().toISOString();

export const getPrintableShortDate = (date?: Date): string =>
	new Intl.DateTimeFormat("es-AR", {
		day: "numeric",
		month: "long",
	}).format(date);

export const getPrintableFullDateTime = (date?: Date): string =>
	new Intl.DateTimeFormat("es-AR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(date);

/**
 * Returns the elapsed time between two dates.
 * @param initialDate The date from which calculate the elapsed time.
 * @param finalDate The date to which calculate the elapsed time. Current date by default.
 * @returns An object containing the elapsed time, with its corresponding measure unit.
 * @throws {Error} If initialDate is later than finalDate.
 */
export const getElapsedTime = (
	initialDate: Date,
	finalDate: Date = new Date()
): TimePeriod => {
	if (initialDate > finalDate) {
		throw new Error("Initial date must be previous to final date");
	}
	let millisecondsDifference = finalDate.getTime() - initialDate.getTime();
	let matchedPeriod = ORDERED_PERIODS.find(
		(period) => millisecondsDifference > period.millisecondsQuantity
	);
	return matchedPeriod
		? {
				units: Math.round(
					millisecondsDifference / matchedPeriod.millisecondsQuantity
				),
				measureUnit: matchedPeriod.unit,
		  }
		: { units: 1, measureUnit: "segundo" }; // Milliseconds difference doesn't exceed 1 second
};

export const getPrintableTimePeriod = (timePeriod: TimePeriod): string =>
	`Hace ${timePeriod.units} ${timePeriod.measureUnit}${
		timePeriod.units > 1 ? "s" : ""
	}`;
