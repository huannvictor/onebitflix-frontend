/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/registerLogin.module.scss";
import HeaderGeneric from "@/components/common/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/components/common/footer";

const Login = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          btnContent="Quero fazer parte"
          btnUrl="/"
          logoUrl="/public/logoOnebitflix.svg"
        />

        <Container className="py-5">
          <p className={styles.formTitle}>Bem vindo(a)!</p>

          <Form className={styles.form}>
            <p className="text-center">
              <strong>Acesse ao OneBitFlix!</strong>
            </p>

            <FormGroup>
              <Label for="email" className={styles.label}>
                EMAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@mail.com"
                required
                className={styles.input}
              />
            </FormGroup>

            <FormGroup>
              <Label>SENHA</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="senha"
                required
                className={styles.input}
              />
            </FormGroup>

            <Button outline className={styles.formBtn}>
              ENTRAR
            </Button>
          </Form>
        </Container>

        <Footer />
      </main>
    </>
  );
};

export default Login;
