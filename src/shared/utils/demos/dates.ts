import {
	getCurrentISODate,
	getElapsedTime,
	getPrintableFullDateTime,
	getPrintableShortDate,
	getPrintableTimePeriod,
} from "../dates";

getCurrentISODate();

getElapsedTime(new Date("2025-08-27T13:11:35.525Z"));
getElapsedTime(new Date());

getPrintableTimePeriod({ units: 49, measureUnit: "semana" });
getPrintableTimePeriod({ units: 1, measureUnit: "minuto" });
getPrintableTimePeriod({ units: 2, measureUnit: "dia" });
getPrintableTimePeriod({ units: 59, measureUnit: "segundo" });

getPrintableFullDateTime(new Date("2025-08-19T20:45:20.721Z"));
getPrintableFullDateTime();

getPrintableShortDate(new Date("2025-08-19T20:45:20.721Z"));
getPrintableShortDate();
