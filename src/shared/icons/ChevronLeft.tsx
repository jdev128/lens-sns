import type { IconProps } from "./IconProps";

export const ChevronLeft = ({ small }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-6"
			width={small ? "24px" : "32px"}
			height={small ? "24px" : "32px"}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 19.5 8.25 12l7.5-7.5"
			/>
		</svg>
	);
};
