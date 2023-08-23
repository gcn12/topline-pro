import { Inter } from "next/font/google";
import ImageGallery from "@/screens/ImageGallery/ImageGallery";
import Head from "next/head";
import Searchbar from "@/screens/ImageGallery/Searchbar";
import Spacer from "@/components/Spacer";
import Header from "@/screens/Global/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Image Gallery</title>
      </Head>
      <Header />
      <Spacer size={36} axis="y" />
      <Searchbar />
      <Spacer size={56} axis="y" />
      <ImageGallery />
    </div>
  );
}
