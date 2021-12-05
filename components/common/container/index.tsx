import styles from "./index.module.scss";
import { PropsWithChildren } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import Footer from "@components/common/footer";
import Header from "@components/common/header";

export default function Container({ children }: PropsWithChildren<{}>) {
  return (
    <div className={styles.container}>
      <Layout>
        <Header />
        <Layout.Content style={{ padding: "10px 10px" }}>
          {children}
        </Layout.Content>
        <Footer />
      </Layout>
    </div>
  );
}
