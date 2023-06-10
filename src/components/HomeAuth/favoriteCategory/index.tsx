/* eslint-disable @next/next/no-img-element */
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";
import useSWR from "swr";

import courseService from "@/services/courseService";
import styles from "@/styles/slideCategory.module.scss";

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourses);
  // console.log(data.data.courses);

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {data.data.courses?.length > 0 ? (
        <SlideComponent course={data.data.courses} />
      ) : (
        <p className="text-center pt-3 h5">
          <strong>Você não tem nenhum curso na lista</strong>
        </p>
      )}
    </>
  );
};

export default FavoriteCategory;
