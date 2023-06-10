/* eslint-disable @next/next/no-img-element */
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";
import courseService from "@/services/courseService";
import useSWR from "swr";

import styles from "../../../../styles/slideCategory.module.scss";

const FeaturedCategory = () => {
  const { data, error } = useSWR("/featured", courseService.getFeaturedCourses);

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>EM DESTAQUE</p>
      <SlideComponent course={data.data} />
    </>
  );
};

export default FeaturedCategory;
