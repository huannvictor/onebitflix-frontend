/* eslint-disable @next/next/no-img-element */
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/profile.module.scss";

const PasswordForm = () => {
  return (
    <>
      <Form className={styles.form}>
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
            />
          </FormGroup>
        </div>

        <Button className={styles.formBtn} outline type="submit">
          SALVAR ALTERAÇÕES
        </Button>
      </Form>
    </>
  );
};

export default PasswordForm;
