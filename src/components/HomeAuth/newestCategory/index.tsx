/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import courseService, { CourseType } from "@/services/courseService";
import SlideComponent from "@/components/common/slideComponent";

import styles from "../../../styles/styles.module.scss";

const NewestCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourse);

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
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default NewestCategory;
