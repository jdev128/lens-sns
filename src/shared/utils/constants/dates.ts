export const MILLISECONDS_PER_SECOND = 1000;
export const MILLISECONDS_PER_MINUTE = 1000 * 60;
export const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
export const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;
export const MILLISECONDS_PER_WEEK = MILLISECONDS_PER_DAY * 7;

export const ORDERED_PERIODS = Object.freeze([
	{
		millisecondsQuantity: MILLISECONDS_PER_DAY,
		unit: "dia",
	},
	{
		millisecondsQuantity: MILLISECONDS_PER_HOUR,
		unit: "hora",
	},
	{
		millisecondsQuantity: MILLISECONDS_PER_MINUTE,
		unit: "minuto",
	},
	{
		millisecondsQuantity: MILLISECONDS_PER_SECOND,
		unit: "segundo",
	},
]);
