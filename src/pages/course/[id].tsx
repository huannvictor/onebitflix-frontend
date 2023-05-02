/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import styles from "../../styles/coursePage.module.scss";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/services/courseService";

import Head from "next/head";
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Container } from "reactstrap";
import PageSpinner from "@/components/common/spinner";
import EpisodeList from "@/components/episodeList";
import Footer from "@/components/common/footer";

const CoursePage = () => {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const getCourse = async () => {
    if (typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if (res.status === 200) {
      setCourse(res.data);
      setLiked(res.data.liked);
      setFavorite(res.data.favorite);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  const handleLikeCourse = async () => {
    if (typeof id !== "string") return;

    if (liked === true) {
      await courseService.RemoveLike(id);
      setLiked(false);
    } else {
      await courseService.like(id);
      setLiked(true);
    }
  };

  const handleFavCourse = async () => {
    if (typeof id !== "string") return;

    if (favorite === true) {
      await courseService.removeFav(id);
      setFavorite(false);
    } else {
      await courseService.addToFav(id);
      setFavorite(true);
    }
  };

  if (course === undefined) return <PageSpinner />;

  return (
    <>
      <Head>
        <title>Onebitflix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, #151515dd, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "550px",
          }}
        >
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={course?.episodes?.length === 0 ? true : false}
          >
            ASSISTA AGORA
            <img
              src="/buttonPlay.svg"
              alt="button image"
              className={styles.buttonImg}
            />
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img
                src="/course/iconLike.svg"
                alt="like icon"
                className={styles.interactionImg}
                onClick={handleLikeCourse}
              />
            ) : (
              <img
                src="/course/iconLiked.svg"
                alt="like icon"
                className={styles.interactionImg}
                onClick={handleLikeCourse}
              />
            )}
            {favorite === false ? (
              <img
                src="/course/iconAddFav.svg"
                alt="add favorite icon"
                className={styles.interactionImg}
                onClick={handleFavCourse}
              />
            ) : (
              <img
                src="/course/iconFavorited.svg"
                alt="add favorite icon"
                className={styles.interactionImg}
                onClick={handleFavCourse}
              />
            )}
          </div>
        </Container>

        <Container className={styles.episodeInfo}>
          <p className={styles.epDivision}>EPISÓDIOS</p>
          <p className={styles.epLength}>
            {course?.episodes?.length} episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <p>
              <strong>
                Não temos episódios no ar ainda, volte outra hora.
                &#x1F606;&#x1F918;
              </strong>
            </p>
          ) : (
            course?.episodes?.map((episode) => (
              <EpisodeList key={episode.id} episode={episode} />
            ))
          )}
        </Container>

        <Footer />
      </main>
    </>
  );
};

export default CoursePage;
