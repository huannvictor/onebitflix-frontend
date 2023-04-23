/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/components/common/footer";

import styles from "../styles/registerLogin.module.scss";
import ToastComponent from "@/components/common/toast";
import authService from "@/services/authService";

const Login = () => {
  const router = useRouter();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const registeredSuccess = router.query.registered;

    if (registeredSuccess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      setToastMessage("Cadastro realizado");
    }
  }, [router.query]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      router.push("/home");
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      setToastMessage("Email ou senha incorretos");
    }
  };

  return (
    <>
      <Head>
        <title>OneBitFlix - Registro</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          btnContent="Quero fazer parte"
          btnUrl="/register"
          logoUrl="/"
        />

        <Container className="py-5">
          <p className={styles.formTitle}>Bem vindo(a)!</p>

          <Form className={styles.form} onSubmit={handleLogin}>
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

            <Button outline className={styles.formBtn} type="submit">
              ENTRAR
            </Button>
          </Form>

          <ToastComponent
            color={toastColor}
            isOpen={toastIsOpen}
            message={toastMessage}
          />
        </Container>

        <Footer />
      </main>
    </>
  );
};

export default Login;
