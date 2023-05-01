/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import PageSpinner from "@/components/common/spinner";
import categoriesService, { CategoryType } from "@/services/categoriesService";
import ListCategorySlide from "../listCategorySlide";

const ListCategories = () => {
  const { data, error } = useSWR(
    "/listCategories",
    categoriesService.getCategories
  );

  if (error) return error;

  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      {data.data.categories?.map((category: CategoryType) => (
        <ListCategorySlide
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  );
};

export default ListCategories;
