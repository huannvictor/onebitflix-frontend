/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FeaturesSection from "@/components/HomeAuth/featuresSection";
import NewestCategory from "@/components/HomeAuth/newestCategory";
import FavoriteCategory from "@/components/HomeAuth/favoriteCategory";
import FeaturedCategory from "@/components/HomeAuth/featuredCategory";
import ListCategories from "@/components/HomeAuth/listCategories";
import Footer from "@/components/common/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageSpinner from "@/components/common/spinner";

const HomeAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("onebitflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <main>
        <FeaturesSection />
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <ListCategories />
        <Footer />
      </main>
    </>
  );
};

export default HomeAuth;
