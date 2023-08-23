import Image from "next/image";
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import ImageGallery from "@/screens/ImageGallery/ImageGallery";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <ImageGallery />
    </div>
  );
}
