/* eslint-disable @next/next/no-img-element */
import { Button, Container } from "reactstrap";
import Link from "next/link";

import styles from "./styles.module.scss";

interface props {
  logoUrl: string;
  btnUrl: string;
  btnContent: string;
}

const HeaderGeneric = ({ logoUrl, btnUrl, btnContent }: props) => {
  return (
    <>
      <div className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link href={logoUrl}>
            <img
              src="/logoOnebitflix.svg"
              alt="Register Logo"
              className={styles.headerLogo}
            />
          </Link>

          <Link href={btnUrl}>
            <Button outline color="light" className={styles.headerBtn}>
              {btnContent}
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default HeaderGeneric;
