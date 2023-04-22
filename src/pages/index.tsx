import { ReactNode, useEffect } from "react";
import { GetStaticProps } from "next";
import AOS from "aos";
import courseService, { CourseType } from "@/services/courseService";

import Head from "next/head";
import HeaderNoAuth from "@/components/HomeNoAuth/headerNoAuth";
import PresentationSection from "@/components/HomeNoAuth/presentationSection";
import CardsSection from "@/components/HomeNoAuth/cardsSection";
import SlideSection from "@/components/HomeNoAuth/slideSection";
import Footer from "@/components/common/footer";

import styles from "../styles/HomeNoAuth.module.scss";
import "aos/dist/aos.css";

interface IndexPageProps {
  children?: ReactNode;
  course: CourseType[];
}

const HomeNoAuth = ({ course }: IndexPageProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <meta property="og:title" content="OneBitFlix" key="title" />
        <meta
          name="description"
          content="Tenha cesso aos melhores conteúdos de programação de uma forma simples e fácil!"
        />
      </Head>
      <main>
        <div
          className={styles.sectionBackground}
          data-aos="fade-zoom-in"
          data-aos-duration="1600"
        >
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1200">
          <CardsSection />
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
          <SlideSection newestCourses={course} />
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await courseService.getNewestCourse();

  return {
    props: {
      course: res.data,
    },
    revalidate: 3600 * 24,
  };
};

export default HomeNoAuth;
