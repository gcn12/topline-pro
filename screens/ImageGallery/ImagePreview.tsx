import Image from "next/image";
import ImageModal from "./ImageModal";
import { motion } from "framer-motion";

interface Props {
  imageObj: Image;
}

const MotionImage = motion(Image);

export default function ImagePreview({ imageObj }: Props) {
  return (
    <div>
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
