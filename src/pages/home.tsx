/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import FeaturesSection from "@/components/HomeAuth/featuresSection";
import NewestCategory from "@/components/HomeAuth/newestCategory";
import FavoriteCategory from "@/components/HomeAuth/favoriteCategory";
import FeaturedCategory from "@/components/HomeAuth/featuredCategory";

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
      </main>
    </>
  );
};

export default HomeAuth;
