/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import ToastComponent from "@/components/common/toast";

import profileService from "@/services/profileService";
import styles from "../../../styles/profile.module.scss";

const UserForm = () => {
  const router = useRouter();

  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState(email);
  const [created_at, setCreated_at] = useState("");

  const [savedFirstName, setSavedFirstName] = useState("");
  const [savedLastName, setSavedLastName] = useState("");

  const [abbreviation, setAbbreviation] = useState("");
  const [fullName, setFullName] = useState("");

  const date = new Date(created_at);
  const month = date.toLocaleDateString("default", { month: "long" });

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setSavedFirstName(user.firstName);
      setSavedLastName(user.lastName);
      setPhone(user.phone);
      setEmail(user.email);
      setInitialEmail(user.email);
      setCreated_at(user.createdAt);
    });
  }, []);

  const handleUserUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      created_at,
    });

    if (res !== 200) {
      setToastIsOpen(true);
      setToastMessage("Você não pode alterar para este email.");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }

    setFullName(`${firstName} ${lastName}`);
    setAbbreviation(`${firstName[0]}${lastName[0]}`);

    setToastIsOpen(true);
    setToastMessage("Informações alteradas com sucesso!");
    setColor("bg-success");
    setTimeout(() => {
      setToastIsOpen(false);
    }, 3000);

    if (email !== initialEmail) handleLogout();
  };

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>
            {abbreviation
              ? `${abbreviation}`
              : savedFirstName && savedLastName
              ? `${savedFirstName[0]}${savedLastName[0]}`
              : ""}
          </p>
          <p className={styles.userName}>
            {fullName
              ? fullName
              : savedFirstName && savedLastName
              ? `${savedFirstName} ${savedLastName}`
              : "NOME SOBRENOME"}
          </p>
        </div>
        <div className={styles.membershipTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="User Icon"
            className={styles.membershipTimeImg}
          />
          <p className={styles.membershipTimeText}>
            Membro desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>

        <hr />

        <div className={styles.inputFormDiv}>
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
              defaultValue={firstName}
              onChange={(event) => setFirstName(event.target.value)}
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
              defaultValue={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormGroup>
        </div>

        <div className={styles.inputContactDiv}>
          <FormGroup>
            <Label className={styles.label} for="phone">
              WHATSAPP || TELEGRAM
            </Label>
            <Input
              name="phone"
              id="phone"
              type="tel"
              placeholder="+55 (DDD) 9XXXX XXXX"
              required
              className={styles.input}
              defaultValue={phone}
              onChange={(event) => setPhone(event.target.value)}
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
              className={styles.inputEmail}
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
        </div>

        <Button className={styles.formBtn} outline type="submit">
          SALVAR ALTERAÇÕES
        </Button>
      </Form>

      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default UserForm;
