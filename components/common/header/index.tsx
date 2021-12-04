import { Typography } from "antd";
import styles from "./index.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <Typography.Title>Ethical Poll Website</Typography.Title>
    </div>
  );
}
