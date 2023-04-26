/* eslint-disable @next/next/no-img-element */
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";

import useSWR from "swr";
import courseService, { CourseType } from "@/services/courseService";

import styles from "./styles.module.scss";

const FeaturesSection = () => {
  const { data, error } = useSWR("/features", courseService.getFeaturedCourses);

  if (error) return error;

  if (!data) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      {
        data.data?.map((course: CourseType) => (
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom, #151515dd, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${course.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "480px",
            }}
            key={course.id}
          >
            <HeaderAuth />

            <Container className="pt-4">
              <p className={styles.title}>{course.name}</p>
              <p className={styles.description}>{course.synopsis}</p>
              <Link
                href={`/courses/${course.id}`}
                className={styles.customLink}
              >
                <Button outline color="light" className={styles.button}>
                  ACESSE AGORA!
                  <img
                    src="/buttonPlay.svg"
                    alt="button play image"
                    className={styles.buttonImg}
                  />
                </Button>
              </Link>
            </Container>
          </div>
        ))[0]
      }
    </>
  );
};

export default FeaturesSection;
