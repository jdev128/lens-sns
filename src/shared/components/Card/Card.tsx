import { type ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
	children: ReactNode;
	onClick?: () => void;
}

export const Card = ({ children, onClick }: CardProps) => {
	let classes = `${styles.card} ${onClick ? styles.clickableCard : ""}`;
	return (
		<article className={classes} onClick={onClick}>
			{children}
		</article>
	);
};

interface HeaderProps {
	children: ReactNode;
	endAction?: ReactNode;
}

export const CardHeader = ({ children, endAction }: HeaderProps) => {
	return (
		<header className={styles.cardHeader}>
			<div>{children}</div>
			{endAction && <div>{endAction}</div>}
		</header>
	);
};

interface TitleProps {
	children: ReactNode;
}

export const CardTitle = ({ children }: TitleProps) => {
	return <div className={`titleText ${styles.cardTitle}`}>{children}</div>;
};

interface ContentProps {
	children: ReactNode;
	maxLines?: number
}

export const CardContent = ({ children, maxLines }: ContentProps) => {
	let classes = `${styles.cardContent} ${maxLines ? styles.clampedContent: ""}`;
	return <div className={classes} style={{WebkitLineClamp: maxLines ? maxLines : "none"}}>{children}</div>;
};
