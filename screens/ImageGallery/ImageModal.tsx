import { Dialog, Button } from "@radix-ui/themes";
import { Image } from "./ImagePreview";
import NextImage from "next/image";

interface Props {
  children: React.ReactNode;
  imageObj: Image;
}

export default function ImageModal({ children, imageObj }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>{children}</button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Image</Dialog.Title>

        <NextImage
          src={imageObj.largeImageURL}
          alt=""
          width={imageObj.imageWidth}
          height={imageObj.imageHeight}
          priority={true}
        />

        <div>
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
