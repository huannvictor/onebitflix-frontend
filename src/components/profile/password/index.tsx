/* eslint-disable @next/next/no-img-element */
import ToastComponent from "@/components/common/toast";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import profileService from "@/services/profileService";

import styles from "../../../../styles/profile.module.scss";

const PasswordForm = () => {
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setCurrentPassword(password.currentPassword);
      setNewPassword(password.newPassword);
    });
  }, []);

  const handlePasswordUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(toastIsOpen);

    if (newPassword !== confirmPassword) {
      setToastIsOpen(true);
      setToastMessage("Senha e confirmação são diferentes!");
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      return;
    }

    if (currentPassword === newPassword) {
      setToastIsOpen(true);
      setToastMessage("A nova senha não pode ser a mesma da anterior!");
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      return;
    }

    const res = await profileService.passwordUpdate({
      currentPassword,
      newPassword,
    });

    if (res === 204) {
      setToastIsOpen(true);
      setToastMessage("Senha alterada com sucesso!");
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if (res !== 204) {
      console.log("caiu aqui");
      setToastIsOpen(true);
      setToastMessage("Senha atual incorreta!");
      setToastColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <Form onSubmit={handlePasswordUpdate} className={styles.form}>
        <div className={styles.inputFormDiv}>
          <FormGroup>
            <Label for="currentPassword" className={styles.label}>
              SENHA ATUAL
            </Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
              defaultValue={currentPassword}
              onChange={(event) =>
                setCurrentPassword(event.currentTarget.value)
              }
            />
          </FormGroup>
        </div>

        <div className={styles.inputFormDiv}>
          <FormGroup>
            <Label for="newPassword" className={styles.label}>
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              id="newPassword"
              type="password"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              defaultValue={newPassword}
              onChange={(event) => setNewPassword(event.currentTarget.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmPassword" className={styles.label}>
              CONFIRMAR SENHA
            </Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="******"
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              defaultValue={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.currentTarget.value)
              }
            />
          </FormGroup>
        </div>

        <Button className={styles.formBtn} outline type="submit">
          SALVAR ALTERAÇÕES
        </Button>
      </Form>

      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default PasswordForm;
