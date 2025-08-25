import type { FC, ReactNode } from "react";
import styles from "./Error.module.css";
import { Link } from "react-router";

interface Props {
	children?: ReactNode;
}

export const Error: FC<Props> = ({ children }) => {
	return (
		<div className={styles.errorContainer}>
			{children}
			<div>
				Por favor, vuelve a la{" "}
				<Link to="/">p&aacute;gina de inicio</Link>
			</div>
		</div>
	);
};
