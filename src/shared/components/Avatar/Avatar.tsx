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
	let classes = `${styles.avatar} ${
		size === "normal" ? "" : styles.smallAvatar
	} ${withBorder ? styles.highlightedAvatar : ""}`;
	return (
		<img className={classes} src={imageURL ? imageURL : defaultAvatar} alt="" />
	);
};
