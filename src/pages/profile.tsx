import Head from "next/head";
import { Button, Col, Container, Row } from "reactstrap";
import HeaderAuth from "@/components/common/headerAuth";
import UserForm from "@/components/profile/user";

import styles from "../styles/profile.module.scss";

const UserInfo = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix - Meus Dados</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main>
        <HeaderAuth />
        <Container className="py-5">
          <p className={styles.title}>Minha Conta</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button className={styles.renderForm}>DADOS PESSOAIS</Button>
              <Button className={styles.renderForm}>SENHA</Button>
            </Col>
            <Col md>
              <UserForm />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default UserInfo;
