/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import HeaderAuth from "@/components/common/headerAuth";

import styles from "./styles.module.scss";

const HomeAuth = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main>
        <HeaderAuth />
      </main>
    </>
  );
};

export default HomeAuth;
