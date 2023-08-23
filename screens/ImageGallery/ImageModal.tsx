import { Dialog, Button } from "@radix-ui/themes";
import { Image } from "./ImagePreview";
import NextImage from "next/image";
import Spacer from "@/components/Spacer";

interface Props {
  children: React.ReactNode;
  imageObj: Image;
}

export default function ImageModal({ children, imageObj }: Props) {
  const tags = imageObj.tags.split(",");

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>{children}</button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 850 }}>
        <NextImage
          src={imageObj.largeImageURL}
          alt=""
          width={imageObj.imageWidth}
          height={imageObj.imageHeight}
          priority={true}
          style={{
            objectFit: "cover",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        />
        <Spacer size={24} axis="y" />
        {imageObj.userImageURL ? (
          <div className="flex items-center">
            <NextImage
              className="w-40px h-40px object-cover rounded-circle overflow-hidden"
              src={imageObj.userImageURL}
              height={40}
              width={40}
              alt={`${imageObj.user}'s avatar`}
              style={{
                objectFit: "cover",
                overflow: "hidden",
                height: "40px",
                width: "40px",
                borderRadius: "100%",
              }}
            />
            <Spacer size={8} axis="x" />
            <p className="font-700 text-18px">{imageObj.user}</p>
          </div>
        ) : null}
        <Spacer size={24} axis="y" />

        <p>Tags:</p>
        <Spacer size={8} axis="y" />
        <div className="flex gap-4px">
          {tags.map((tag) => {
            return (
              <div className="px-[10px] py-8px rounded-4px bg-grey-900">
                <p className="text-14px">{tag}</p>
              </div>
            );
          })}
        </div>
        <Spacer size={24} axis="y" />
        <Dialog.Close>
          <button className="bg-black text-white px-24px py-8px rounded-6px">
            close
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
