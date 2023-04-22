/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";

import styles from "../styles/registerLogin.module.scss";

const Register = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
      </main>
    </>
  );
};

export default Register;
