import Image from "next/image";
import ImageModal from "./ImageModal";

interface Props {
  imageObj: Image;
}

export default function ImagePreview({ imageObj }: Props) {
  return (
    <div>
      <ImageModal imageObj={imageObj}>
        <Image src={imageObj.previewURL} alt="" width={200} height={200} />
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
};
