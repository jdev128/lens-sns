import { useRef } from "react";
import styles from "./Avatar.module.css";
import defaultAvatar from "/src/assets/octicon_feed-person-16.png";

interface Props {
	imageURL: string;
	size?: "normal" | "small";
	withBorder?: boolean;
}

export const Avatar = ({
	imageURL,
	size = "normal",
	withBorder = false,
}: Props) => {
	const imageElement = useRef<HTMLImageElement>(null);

	let classes = `${styles.avatar} ${
		size === "normal" ? "" : styles.smallAvatar
	} ${withBorder ? styles.highlightedAvatar : ""}`;

	const handleLoadError = () => {
		if (imageElement.current) {
			imageElement.current.src = defaultAvatar;
		}
	};

	return (
		<img
			className={classes}
			src={imageURL}
			alt=""
			ref={imageElement}
			onError={handleLoadError}
		/>
	);
};
