import styles from "./Avatar.module.css";

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
	return <img className={classes} src={imageURL} alt="" />;
};
