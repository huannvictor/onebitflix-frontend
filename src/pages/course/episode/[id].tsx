/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from "../../../styles/episodePlayer.module.scss";

import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";
import PageSpinner from "@/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/services/courseService";

const EpisodePlayer = () => {
  const router = useRouter();

  const [course, setCourse] = useState<CourseType>();

  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = router.query.courseid?.toString() || "";

  const getCourse = async () => {
    if (typeof courseId !== "string") return;

    const res = await courseService.getEpisodes(courseId);

    if (res.status === 200) setCourse(res.data);
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  if (course?.episodes === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {course.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />

        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>
            {course.episodes[episodeOrder].name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer
              className={styles.player}
              url={`${
                process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${
                course.episodes[episodeOrder].videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}
          <div className={styles.episodeButton}>
            <Button className={styles.episodeButton} outline>
              <img
                src="/episode/iconArrowLeft.svg"
                alt="left arrow"
                className={styles.arrowImg}
              />
            </Button>

            <Button className={styles.episodeButton} outline>
              <img
                src="/episode/iconArrowRight.svg"
                alt="right arrow"
                className={styles.arrowImg}
              />
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default EpisodePlayer;
