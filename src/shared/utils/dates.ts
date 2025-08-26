import { MILLISECONDS_PER_WEEK, ORDERED_PERIODS } from "./constants/dates";

export const getCurrentISODate = () => new Date().toISOString();

export const getShortDate = (date: Date) =>
	new Intl.DateTimeFormat("es-AR", {
		day: "numeric",
		month: "long",
	}).format(date);

export const getFullFormattedDateTime = (date?: Date) =>
	new Intl.DateTimeFormat("es-AR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	}).format(date);

/**
 * Returns the elapsed period from a certain date. 
 * If more than a week has elapsed, the date on its short format is returned.
 * @param initialDate The date from which it is needed to calculate the elapsed time.
 * @returns A string containing the elapsed time with its units, or the date on its short format.
 */
export const getElapsedTimeString = (initialDate: Date): string => {
	let currentDate = new Date();
	let millisecondsDifference = currentDate.getTime() - initialDate.getTime();
	if (millisecondsDifference > MILLISECONDS_PER_WEEK) {
		return getShortDate(initialDate);
	}
	let matchedPeriod = ORDERED_PERIODS.find(
		(period) => millisecondsDifference > period.millisecondsQuantity
	);
	if (matchedPeriod) {
		let elapsedTime = Math.round(
			millisecondsDifference / matchedPeriod?.millisecondsQuantity
		);
		return `Hace ${elapsedTime} ${matchedPeriod.unit}${
			elapsedTime > 1 ? "s" : ""
		}`;
	}
	// Milliseconds difference doesn't exceed 1 second
	return "Hace 1 segundo";
};
