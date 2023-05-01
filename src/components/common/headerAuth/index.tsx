/* eslint-disable @next/next/no-img-element */
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Form, Input } from "reactstrap";
import Link from "next/link";
import Modal from "react-modal";

import styles from "./styles.module.scss";
import profileService from "@/services/profileService";

Modal.setAppElement("#__next");

const HeaderAuth = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`search?name=${searchTerm}`);
    setSearchTerm("");
  };

  const handleSearchOnClick = () => {
    router.push(`search?name=${searchTerm}`);
    setSearchTerm("");
  };

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      const firstNameInicial = user.firstName.slice(0, 1);
      const lastNameInicial = user.lastName.slice(0, 1);

      setInitials(firstNameInicial + lastNameInicial);
    });
  }, []);

  const handleToggleModal = () => {
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/");
  };

  return (
    <>
      <Container className={styles.nav}>
        <Link href="home">
          <img
            src="/logoOneBitflix.svg"
            alt="logo onebitflix"
            className={styles.imgLogoNav}
          />
        </Link>

        <div className={`${styles.navLeftItems} d-flex align-items-center`}>
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Pesquisar"
              className={styles.input}
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.currentTarget.value.toLowerCase())
              }
            />
          </Form>

          <img
            src="/homeAuth/iconSearch.svg"
            alt="lupa header"
            className={styles.searchImg}
            onClick={handleSearchOnClick}
          />

          <p className={styles.userProfile} onClick={handleToggleModal}>
            {initials}
          </p>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleToggleModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile" className={styles.customLink}>
            <p className={styles.modalLink}>Meus Dados</p>
          </Link>

          <p className={styles.modalLink} onClick={handleLogout}>
            Sair
          </p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth;
