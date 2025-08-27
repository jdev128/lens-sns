/*
    Alt: https://www.typescriptlang.org/docs/handbook/enums.html#string-enums
    Unusable because of erasableSyntaxOnly property on typescript config 
    (Syntax with runtime behavior not supported)
*/

export type TimeUnit =
	| "año"
	| "mes"
	| "semana"
	| "dia"
	| "hora"
	| "minuto"
	| "segundo";
