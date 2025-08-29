import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
	children: ReactNode;
	onClick: () => void;
	disabled?: boolean;
	variant?: "solid" | "outlined" | "text" | "rounded";
	size?: "large" | "regular" | "small";
	expansible?: boolean;
}

export const Button = ({
	children,
	onClick,
	disabled = false,
	variant = "solid",
	size = "regular",
	expansible = false,
}: Props) => {
	let classes = [
		styles.button,
		variant === "solid" ? styles.solidButton : "",
		variant === "outlined" ? styles.outlinedButton : "",
		variant === "rounded" ? styles.roundedButton : "",
		size === "small" ? styles.smallButton : "",
		size === "large" ? styles.largeButton : "",
		expansible ? styles.blockButton : "",
	]
		.join(" ")
		.trim();
	return (
		<button
			className={classes}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
