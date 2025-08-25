import { Outlet } from "react-router";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import styles from "./Layout.module.css";

export const Layout = () => {
	return (
		<>
			<Navbar/>
			<div className={styles.gridLayout}>
				<Sidebar />
				<main>
					<Outlet />
				</main>
				<Sidebar />
			</div>
		</>
	);
};
