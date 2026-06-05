import type { ReactNode } from "react";
import styles from "./List.module.css";

interface ListProps {
	interactive?: boolean;
	children: ReactNode;
}

export const List = ({ children, interactive = false }: ListProps) => {
	let classes = `${styles.list} ${interactive ? styles.interactiveList : ""}`;
	return <div className={classes}>{children}</div>;
};
