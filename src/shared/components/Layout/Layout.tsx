import { Outlet } from "react-router";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import logo from "/src/assets/lens-logo.svg";
import styles from "./Layout.module.css";
import { Avatar } from "../Avatar";
import { useUserContext } from "../../../context/UserContext";
import { useLayoutEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "../../utils/constants/layout";

export const Layout = () => {
	let { user } = useUserContext();
	const [isMobile, setIsMobile] = useState(false);

	const updateLayout = () => {
		setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
	};

	useLayoutEffect(() => {
		updateLayout();
		window.addEventListener("resize", updateLayout);
		return () => {
			window.removeEventListener("resize", updateLayout);
		};
	}, []);

	return (
		<>
			<Navbar
				homeIcon={logo}
				endSection={<Avatar imageURL={user.avatar} withBorder />}
			/>
			<div className={styles.layout}>
				<Sidebar collapsed={isMobile}/>
				<main>
					<Outlet />
				</main>
				<Sidebar collapsed={isMobile}/>
			</div>
		</>
	);
};
