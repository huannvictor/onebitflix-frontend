/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import courseService, { CourseType } from "@/services/courseService";
import styles from "./styles.module.scss";
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Container } from "reactstrap";
import Link from "next/link";

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
          <div key={course.id}>
            <HeaderAuth />

            <Container>
              <p className={styles.title}>{course.name}</p>
              <p className={styles.description}>{course.synopsis}</p>
              <Link href={`/courses/${course.id}`}>
                <Button outline color="light">
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
