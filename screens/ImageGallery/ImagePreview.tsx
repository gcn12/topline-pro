import Image from "next/image";
import ImageModal from "./ImageModal";
import { motion } from "framer-motion";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import Spacer from "@/components/Spacer";
import { useEffect, useState } from "react";

interface Props {
  imageObj: Image;
}

const MotionImage = motion(Image);

export default function ImagePreview({ imageObj }: Props) {
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    setIsStarred(localStorage.getItem(String(imageObj.id)) === "true");
  }, []);

  const starImage = () => {
    localStorage.setItem(String(imageObj.id), "true");
    setIsStarred(true);
  };

  const unstarImage = () => {
    localStorage.removeItem(String(imageObj.id));
    setIsStarred(false);
  };

  return (
    <div className="flex flex-col">
      <ImageModal imageObj={imageObj}>
        <MotionImage
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          src={imageObj.previewURL}
          alt=""
          width={200}
          height={200}
          style={{
            objectFit: "cover",
            overflow: "hidden",
            height: "200px",
            width: "200px",
            borderRadius: "12px",
            border: "1px solid rgba(0, 0, 0, .1)",
          }}
        />
      </ImageModal>
      <Spacer size={12} axis="y" />
      {isStarred ? (
        <button onClick={unstarImage}>
          <HeartFilledIcon />
        </button>
      ) : (
        <button onClick={starImage}>
          <HeartIcon />
        </button>
      )}
    </div>
  );
}

export type Image = {
  id: number;
  imageHeight: number;
  imageWidth: number;
  largeImageURL: string;
  tags: string;
  user: string;
  previewURL: string;
  userImageURL: string;
};
