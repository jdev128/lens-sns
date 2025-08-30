import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";
import { Button } from "../Button";
import { CloseMark } from "../../icons/CloseMark";

interface DialogProps {
	children: ReactNode;
    onClose: () => void;
	open: boolean;
}

export const Dialog = ({ open, onClose, children }: DialogProps) => {
	const dialog = useRef<HTMLDialogElement>(null);

	const closeDialog = () => {
		dialog.current?.close();
	};

	const showDialog = () => {
		dialog.current?.showModal();
	};

    useEffect(() => {
      dialog.current?.addEventListener("close", onClose);
      return () => {
        dialog.current?.removeEventListener("close", onClose);
      }
    }, [])
    

	useEffect(() => {
		open ? showDialog() : closeDialog();
	}, [open]);

	return (
		<dialog className={styles.dialog} ref={dialog}>
			{children}
		</dialog>
	);
};

interface DialogHeaderProps {
	onClose: () => void;
	children?: ReactNode;
}

export const DialogHeader = ({ onClose, children }: DialogHeaderProps) => {
	return (
		<header className={styles.dialogHeader}>
			<div className={`titleText ${styles.dialogTitle}`}>{children}</div>
			<Button size="small" variant="rounded" onClick={onClose}>
				<CloseMark size="20px" />
			</Button>
		</header>
	);
};

interface DialogContentProps {
	children: ReactNode;
}

export const DialogContent = ({children}: DialogContentProps) => {
	return <main className={styles.dialogContent}>{children}</main>;
};

interface DialogFooterProps {
	children: ReactNode;
}

export const DialogFooter = ({children}: DialogFooterProps) => {
  return (
    <footer className={styles.dialogFooter}>{children}</footer>
  )
}
