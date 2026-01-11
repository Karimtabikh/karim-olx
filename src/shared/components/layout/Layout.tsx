import { ReactNode } from "react";
import Head from "next/head";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import styles from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({
  children,
  title = "OLX Lebanon",
  description = "Buy and sell everything from used cars to mobile phones and computers",
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
