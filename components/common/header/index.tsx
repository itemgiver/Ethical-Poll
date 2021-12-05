import styles from "./index.module.scss";
import { PageHeader } from "antd";

export default function Header() {
  return (
    <PageHeader
      className={styles.container}
      title="ETHICAL POLL"
      subTitle="Ethical Issue Poll Website"
    />
  );
}
