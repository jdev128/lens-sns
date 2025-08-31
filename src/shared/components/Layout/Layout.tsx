import { Outlet } from "react-router";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import logo from "/src/assets/lens-logo.svg";
import styles from "./Layout.module.css";
import { Avatar } from "../Avatar";
import { useUserContext } from "../../../context/UserContext";
import { useCallback, useLayoutEffect, useState } from "react";
import { MOBILE_BREAKPOINT } from "../../utils/constants/layout";
import { Button } from "../Button";
import { Plus } from "../../icons/Plus";
import { CreateCommentDialog } from "../../../features/posts/components/CreateCommentDialog";
import { RefreshIcon } from "../../icons/RefreshIcon";

export const Layout = () => {
	let { user, randomizeUser } = useUserContext();
	const [isMobile, setIsMobile] = useState(false);

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const closeDialog = useCallback(() => {
		setIsDialogOpen(false);
	}, []);

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
				endSection={
					<>
						<Button
							onClick={() => {
								setIsDialogOpen(true);
							}}
						>
							<Plus />
							Crear
						</Button>
						<Button
							onClick={randomizeUser}
							variant="rounded"
							size="large"
							hoverHint={
								<RefreshIcon
									size="22px"
								></RefreshIcon>
							}
						>
							<Avatar imageURL={user.avatar} withBorder />
						</Button>
					</>
				}
			/>
			<div className={styles.layout}>
				<Sidebar collapsed={isMobile} />
				<main>
					<Outlet />
				</main>
				<Sidebar collapsed={isMobile} />
			</div>
			<CreateCommentDialog open={isDialogOpen} onClose={closeDialog} />
		</>
	);
};
