/* eslint-disable @next/next/no-img-element */
import SlideComponent from "@/components/common/slideComponent";
import PageSpinner from "@/components/common/spinner";
import categoriesService from "@/services/categoriesService";
import useSWR from "swr";

import styles from "../../../../styles/slideCategory.module.scss";

interface props {
  categoryId: number;
  categoryName: string;
}

const ListCategorySlide = ({ categoryId, categoryName }: props) => {
  const { data, error } = useSWR(`/categoriesCourses/${categoryId}`, () =>
    categoriesService.getCourses(categoryId)
  );

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data.courses} />
    </>
  );
};

export default ListCategorySlide;
