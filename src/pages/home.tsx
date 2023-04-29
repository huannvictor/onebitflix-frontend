/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FeaturesSection from "@/components/HomeAuth/featuresSection";
import NewestCategory from "@/components/HomeAuth/newestCategory";
import FavoriteCategory from "@/components/HomeAuth/favoriteCategory";
import FeaturedCategory from "@/components/HomeAuth/featuredCategory";
import ListCategories from "@/components/HomeAuth/listCategories";
import Footer from "@/components/common/footer";

const HomeAuth = () => {
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
