import { memo, type ReactNode } from "react";
import styles from "./TextArea.module.css";

interface Props {
	name: string;
	placeholder: string;
	value: string;
	onChange: (newValue: string) => void;
	label?: string;
	minLength?: number;
	maxLength?: number;
	rows?: number;
	actions?: ReactNode;
}

export const TextArea = memo(
	({
		name,
		placeholder,
		value,
		onChange,
		label,
		minLength,
		maxLength,
		rows,
		actions,
	}: Props) => {
		return (
			<>
				{(label || maxLength) && (
					<div className={styles.textareaHeader}>
						<div className={styles.label}>
							{label && <label htmlFor={name}>{label}</label>}
						</div>
						{maxLength && (
							<p
								className={`clarificationText deemphasizedText ${styles.characterCounter}`}
							>
								{value.length} / {maxLength}
							</p>
						)}
					</div>
				)}
				<div className={styles.textareaContainer}>
					<textarea
						className={styles.textarea}
						name={name}
						id={name}
						placeholder={placeholder}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						minLength={minLength}
						maxLength={maxLength}
						rows={rows}
					/>
					{actions && (
						<div className={styles.textareaActions}>{actions}</div>
					)}
				</div>
			</>
		);
	}
);
