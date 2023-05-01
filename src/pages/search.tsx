/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import courseService, { CourseType } from "@/services/courseService";

import Head from "next/head";
import HeaderAuth from "@/components/common/headerAuth";

import styles from "../styles/search.module.scss";
import SearchCard from "@/components/searchCard";
import { Container } from "reactstrap";
import Footer from "@/components/common/footer";
import PageSpinner from "@/components/common/spinner";

const Search = () => {
  const router = useRouter();
  const searchTerm = router.query.name;
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);

  const searchCourses = async () => {
    if (typeof searchTerm === "string") {
      const res = await courseService.getSearch(searchTerm);

      setSearchResult(res.data.courses);
    }
  };

  useEffect(() => {
    searchCourses();
  }, [searchTerm]);

  return (
    <>
      <Head>
        <title>OneBitFlix - {searchTerm}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        {searchResult.length > 0 ? (
          <div className={styles.searchContainer}>
            <Container className="d-flex flex-wrap justify-content-center gap-4 py-4">
              {searchResult?.map((course) => (
                <SearchCard key={course.id} course={course} />
              ))}
            </Container>
          </div>
        ) : (
          <div className={styles.searchContainer}>
            <p className={styles.noSearchResult}>
              Termo: <q>{searchTerm}</q> não encontrado
            </p>
          </div>
        )}
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Search;
