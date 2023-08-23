import Image from "next/image";

interface Props {
  imageObj: Image;
}

export default function ImagePreview({ imageObj }: Props) {
  return (
    <div>
      <Image src={imageObj.previewURL} alt="" width={200} height={200} />
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
