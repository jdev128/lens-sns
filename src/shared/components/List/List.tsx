import type { ReactNode } from "react"
import styles from "./List.module.css"

interface ListProps {
    children: ReactNode
}

export const List = ({children}: ListProps) => {
  return (
    <div>{children}</div>
  )
}

interface ListItemProps {
    children: ReactNode
}

export const ListItem = ({children}: ListItemProps) => {
  return (
    <div className={styles.listItem}>{children}</div>
  )
}
