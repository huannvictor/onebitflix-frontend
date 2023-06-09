/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Footer from "@/components/common/footer";
import HeaderAuth from "@/components/common/headerAuth";
import UserForm from "@/components/profile/user";
import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";

import PageSpinner from "@/components/common/spinner";
import PasswordForm from "@/components/profile/password";
import { useRouter } from "next/router";
import styles from "../styles/profile.module.scss";

const UserInfo = () => {
  const [form, setForm] = useState("userForm");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>OneBitFlix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                style={{ color: form === "userForm" ? "#b30d39" : "#ccc8c9" }}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                DADOS PESSOAIS
              </Button>
              <Button
                className={styles.renderForm}
                style={{
                  color: form === "passwordForm" ? "#b30d39" : "#ccc8c9",
                }}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                SENHA
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default UserInfo;
