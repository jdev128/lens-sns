import type { ReactNode } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router";

interface Props {
	homeIcon: string;
	children?: ReactNode;
	endSection?: ReactNode;
}

export const Navbar = ({ homeIcon, children, endSection }: Props) => {
	return (
		<header className={styles.navbar}>
			<Link to="/">
				<img className={styles.logo} src={homeIcon} alt="" />
			</Link>
			<nav className={styles.content}>{children}</nav>
			<div>{endSection}</div>
		</header>
	);
};
