/* eslint-disable @next/next/no-img-element */
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import styles from "../../../styles/profile.module.scss";

const UserForm = () => {
  return (
    <>
      <Form className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>HV</p>
          <p className={styles.userName}>HUANN ALMEIDA</p>
        </div>
        <div className={styles.membershipTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="User Icon"
            className={styles.membershipTimeImg}
          />
          <p className={styles.membershipTimeText}>
            Membro desde <br />
            20 de Abril de 2020
          </p>
        </div>

        <hr />

        <div>
          <FormGroup>
            <Label className={styles.label} for="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Primeiro Nome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"John"}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Sobrenome"
              required
              maxLength={20}
              className={styles.inputFlex}
              value={"Doe"}
            />
          </FormGroup>
        </div>

        <div>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP | TELEGRAM
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="+55 (××) ×××××-××××"
              required
              className={styles.input}
              value={"+55 (00) 99999-9999"}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              E-MAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="email@mail.com"
              required
              className={styles.input}
              value={"email@mail.com"}
            />
          </FormGroup>

          <Button className={styles.formBtn} outline type="submit">
            Alterar
          </Button>
        </div>
      </Form>
    </>
  );
};

export default UserForm;
