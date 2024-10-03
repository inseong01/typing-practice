import Head from "next/head";
import styles from "@/styles/Home.module.css";
import CreateSwiper from "@/components/CreateSwiper";

export default function Home() {


  return (
    <>
      <Head>
        <title>Create Next Page Router</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.wrap}`}>
        <main className={styles.main}>
          <div className={styles['main-title']}>목차</div>
          <CreateSwiper />
        </main>
        {/* <footer className={styles.footer}>
          footer
        </footer> */}
      </div>
    </>
  );
}
