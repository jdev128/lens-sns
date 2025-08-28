import type { ReactNode } from "react";
import styles from "./Sidebar.module.css";

interface Props {
	collapsed?: boolean;
	children?: ReactNode;
}

export const Sidebar = ({ collapsed = false, children }: Props) => {
	let classes = `${styles.sidebar} ${
		collapsed ? styles.collapsedSidebar : ""
	}`;
	return <aside className={classes}>{children}</aside>;
};
